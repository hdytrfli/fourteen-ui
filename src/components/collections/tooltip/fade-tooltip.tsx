import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { TooltipContent } from '@/components/primitive/tooltip';
import { useTooltip } from '@/hooks/use-tooltip';

interface Props extends Omit<React.ComponentProps<typeof TooltipContent>, 'children'> {
	children: React.ReactNode;
}

/**
 * Tooltip variant that fades in/out with a subtle slide.
 * Extends TooltipContent with fade effect.
 */
export const FadeTooltip = ({ children, className, ...rest }: Props) => {
	const { open } = useTooltip();
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const states = {
			open: { opacity: VALUES.visible, y: VALUES.zero },
			closed: { opacity: VALUES.hidden, y: 4 },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(container, {
			...states[state],
			duration: DURATION.base,
			ease: EASE.default,
		});
	}, [open]);

	return (
		<TooltipContent ref={contentRef} className={cn(className)} {...rest}>
			{children}
		</TooltipContent>
	);
};
