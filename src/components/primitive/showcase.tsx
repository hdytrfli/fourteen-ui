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
			{ opacity: 0, y: 10, filter: 'blur(10px)' },
			{ opacity: 1, y: 0, filter: 'blur(0px)', duration: DURATION.slow, ease: EASE.inOut }
		);
	}, []);

	return (
		<article
			className={cn(
				'relative',
				'bg-zinc-800 text-zinc-500',
				'flex items-center justify-center',
				'overflow-visible rounded-xl min-h-48 p-10',
				'transition-colors duration-500 ease-in-out',
				'group-hover:text-zinc-700 hover:text-zinc-300',
				className
			)}
			{...rest}>
			<label
				className={cn(
					'w-full max-w-10/12 ',
					'absolute bottom-0 translate-y-full -mb-2',
					'text-center text-sm line-clamp-1 hover:line-clamp-none'
				)}>
				{label}
			</label>
			<div ref={ref} className='w-full flex justify-center'>
				{children}
			</div>
		</article>
	);
};
