import * as React from 'react';
import { gsap } from 'gsap';

import { cn } from '@/libs/utils';
import { DURATION, EASE } from '@/libs/constants';

interface Props extends React.ComponentProps<'article'> {
	label: string;
	children: React.ReactNode;
}

/**
 * Showcase wrapper that fades and unblurs its children on mount.
 * @param label - Caption displayed below the card
 */
export const Showcase = ({ label, children, className, ...rest }: Props) => {
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.fromTo(
			el,
			{ opacity: 0, filter: 'blur(10px)' },
			{ opacity: 1, filter: 'blur(0px)', duration: DURATION.slow, ease: EASE.inOut }
		);
	}, []);

	return (
		<article
			className={cn(
				'relative',
				'bg-zinc-800 rounded-xl h-48',
				'flex items-center justify-center',
				'transition-colors duration-500 ease-in-out',
				'group-hover:text-zinc-700 hover:text-zinc-300',
				className
			)}
			{...rest}>
			<div ref={ref}>{children}</div>
			<label className='w-full text-center absolute bottom-0 translate-y-full -mb-2 text-sm'>
				<span className='ml-2'>{label}</span>
			</label>
		</article>
	);
};
