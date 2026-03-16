import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE } from '@/libs/constants';
import { TooltipContent } from '@/components/primitive/tooltip-content';
import { useTooltip } from '@/hooks/use-tooltip';

interface Props extends Omit<React.ComponentProps<typeof TooltipContent>, 'children'> {
	children: React.ReactNode;
}

/**
 * Tooltip variant that fades in/out with a subtle slide.
 */
export const FadeTooltip = ({ children, className, ...rest }: Props) => {
	const { open } = useTooltip();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.set(el, { opacity: 0, y: 4 });

		if (open) {
			gsap.to(el, {
				opacity: 1,
				y: 0,
				duration: DURATION.slow,
				ease: EASE.out,
			});
		} else {
			gsap.to(el, {
				opacity: 0,
				y: 4,
				duration: DURATION.slow,
				ease: EASE.in,
			});
		}

		return () => {
			gsap.killTweensOf(el);
		};
	}, [open]);

	return (
		<TooltipContent ref={ref} className={cn(className)} {...rest}>
			{children}
		</TooltipContent>
	);
};
