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
	const ref = React.useRef<HTMLDivElement>(null);
	const innerRef = React.useRef<HTMLDivElement>(null);
	const animating = React.useRef(false);

	React.useLayoutEffect(() => {
		const el = ref.current;
		const innerElement = innerRef.current;
		if (!el || !innerElement || animating.current) return;

		animating.current = true;

		if (open) {
			gsap.fromTo(
				el,
				{ height: 0, autoAlpha: 0 },
				{
					height: innerElement.offsetHeight,
					autoAlpha: 1,
					duration: DURATION.base,
					ease: EASE.default,
					onComplete: () => {
						animating.current = false;
						gsap.set(el, {
							height: 'auto',
							clearProps: 'autoAlpha',
						});
					},
				}
			);
		} else {
			gsap.to(el, {
				height: 0,
				autoAlpha: 0,
				duration: DURATION.base,
				ease: EASE.default,
				onComplete: () => {
					animating.current = false;
				},
			});
		}
	}, [open]);

	return (
		<div ref={ref} className={cn('overflow-hidden', className)} {...rest}>
			<div ref={innerRef}>{children}</div>
		</div>
	);
};
