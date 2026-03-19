import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { cn, setPosition } from '@/libs/utils';
import type { Placement } from '@/libs/types';
import { TooltipContext, useTooltip } from '@/hooks/use-tooltip';
import { useDelayedState } from '@/hooks/use-delayed-state';

interface TooltipProps extends React.ComponentProps<'div'> {
	children: React.ReactNode;
	delay?: number;
}

/**
 * Tooltip root that manages open state and wires the trigger child.
 */
export const Tooltip = ({ children, className, delay = 300, ...rest }: TooltipProps) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const anchor = React.useRef<HTMLDivElement>(null);

	const [open, setOpen] = useDelayedState(false, delay);
	const [trigger, ...content] = React.Children.toArray(children);

	return (
		<TooltipContext.Provider value={{ open, setOpen, anchor }}>
			<div
				ref={ref}
				className={cn('relative w-fit', className)}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				{...rest}>
				<div ref={anchor}>{trigger}</div>
				{content}
			</div>
		</TooltipContext.Provider>
	);
};

interface TooltipContentProps extends React.ComponentProps<'div'> {
	placement?: Placement;
	children: React.ReactNode;
	ref?: React.Ref<HTMLDivElement>;
}

/**
 * Tooltip content that portals to document.body.
 */
export const TooltipContent = ({
	ref,
	children,
	className,
	placement = 'top-center',
	...rest
}: TooltipContentProps) => {
	const { open, anchor } = useTooltip();
	const local = React.useRef<HTMLDivElement>(null);
	const external = (ref as React.RefObject<HTMLDivElement>) || local;

	React.useLayoutEffect(() => {
		const element = external.current;
		const tooltip = anchor.current;
		if (!element || !tooltip) return;

		setPosition({
			gap: 6,
			element,
			placement,
			anchor: tooltip.getBoundingClientRect(),
		});
	}, [anchor, placement, external]);

	return ReactDOM.createPortal(
		<div
			ref={external}
			className={cn('absolute z-50 pointer-events-none', {
				'opacity-100 visible': open,
				'opacity-0 invisible': !open,
			})}
			{...rest}>
			<div
				className={cn(
					'wrap-break-words',
					'rounded-2xl border',
					'px-4 py-2 max-w-48',
					'bg-background text-foreground',
					'text-xs font-medium text-center',
					className
				)}>
				{children}
			</div>
		</div>,
		document.body
	);
};
