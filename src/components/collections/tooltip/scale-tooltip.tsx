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
 * Tooltip variant that scales up from center on open.
 */
export const ScaleTooltip = ({ children, className, ...rest }: Props) => {
	const { open } = useTooltip();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		if (open) {
			gsap.set(el, { scale: 0.8, opacity: 0 });
			gsap.to(el, {
				scale: 1,
				opacity: 1,
				duration: DURATION.slow,
				ease: EASE.out,
			});
		} else {
			gsap.to(el, {
				scale: 0.8,
				opacity: 0,
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
