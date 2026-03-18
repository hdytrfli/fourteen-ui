import * as React from 'react';
import { gsap } from 'gsap';

import { cn } from '@/libs/utils';
import { DURATION, EASE } from '@/libs/constants';
import { useInView } from '@/hooks/use-in-view';

interface Props extends React.ComponentProps<'article'> {
	label: string;
	children: React.ReactNode;
}

/**
 * Showcase wrapper that fades and unblurs its children when in view.
 * @param label - Caption displayed below the card
 */
export const Showcase = ({ label, children, className, ...rest }: Props) => {
	const { ref, shown } = useInView({ threshold: 0.3 });

	React.useLayoutEffect(() => {
		const element = ref.current;
		if (!element || !shown) return;

		gsap.fromTo(
			element,
			{ opacity: 0, y: 40, filter: 'blur(10px)' },
			{ opacity: 1, y: 0, filter: 'blur(0px)', duration: DURATION.slow, ease: EASE.default }
		);
	}, [ref, shown]);

	return (
		<article
			className={cn(
				'bg-showcase relative',
				'flex items-center justify-center',
				'overflow-visible rounded-xl min-h-48 p-10',
				'group-hover:text-muted hover:text-foreground',
				className
			)}
			{...rest}>
			<label
				className={cn(
					'w-full max-w-10/12 ',
					'absolute bottom-0 translate-y-full -mb-2',
					'transition-colors duration-500 ease-in-out',
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
