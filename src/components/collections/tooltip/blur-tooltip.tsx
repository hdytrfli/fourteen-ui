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
 * Tooltip variant that blurs in/out on open/close.
 * Extends TooltipContent with blur effect.
 */
export const BlurTooltip = ({ children, className, ...rest }: Props) => {
	const { open } = useTooltip();
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const states = {
			open: { opacity: VALUES.visible, filter: 'blur(0px)', y: VALUES.zero },
			closed: { opacity: VALUES.hidden, filter: 'blur(8px)', y: 4 },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(container, {
			...states[state],
			duration: DURATION.base,
			ease: EASE.default,
		});
	}, [open]);

	return (
		<TooltipContent className={cn(className)} {...rest}>
			<div ref={contentRef} className='opacity-0'>
				{children}
			</div>
		</TooltipContent>
	);
};
