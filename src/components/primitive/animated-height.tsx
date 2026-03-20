import * as React from 'react';
import { gsap } from 'gsap';

import { cn } from '@/libs/utils';
import { DURATION, EASE } from '@/libs/constants';

interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode;
	open: boolean;
}

/**
 * Animated height wrapper that expands/collapses its children with smooth animation.
 * @param children - Content to animate
 * @param open - Whether the content is expanded or collapsed
 */
export const AnimatedHeight = ({ children, open, className, ...rest }: Props) => {
	const initial = React.useRef(true);

	const ref = React.useRef<HTMLDivElement>(null);
	const content = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const element = ref.current;
		const inner = content.current;
		if (!element || !inner) return;

		if (initial.current) {
			initial.current = false;
			gsap.set(element, { height: open ? 'auto' : 0 });
			return;
		}

		if (open) {
			gsap.fromTo(
				element,
				{ height: 0 },
				{
					ease: EASE.default,
					duration: DURATION.base,
					height: inner.offsetHeight,
					onComplete: () => {
						gsap.set(element, { height: 'auto' });
					},
				}
			);
		} else {
			gsap.to(element, {
				height: 0,
				duration: DURATION.base,
				ease: EASE.default,
			});
		}
	}, [open]);

	return (
		<div ref={ref} className={cn('overflow-hidden', className)} {...rest}>
			<div ref={content}>{children}</div>
		</div>
	);
};
