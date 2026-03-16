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
 * Tooltip variant that blurs in/out on open/close.
 */
export const BlurTooltip = ({ children, className, ...rest }: Props) => {
	const { open } = useTooltip();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.set(el, { opacity: 0, filter: 'blur(8px)', y: 4 });

		if (open) {
			gsap.to(el, {
				opacity: 1,
				filter: 'blur(0px)',
				y: 0,
				duration: DURATION.slow,
				ease: EASE.out,
			});
		} else {
			gsap.to(el, {
				opacity: 0,
				filter: 'blur(8px)',
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
