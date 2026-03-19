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
export const Tooltip = ({ children, className, delay = 100, ...rest }: TooltipProps) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const anchor = React.useRef<HTMLDivElement>(null);
	const content = React.useRef<HTMLDivElement>(null);

	const [open, setOpen] = useDelayedState(false, delay);
	const [trigger, ...childrens] = React.Children.toArray(children);

	return (
		<TooltipContext.Provider value={{ open, anchor, content }}>
			<div
				ref={ref}
				className={cn('relative w-fit', className)}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				{...rest}>
				<div ref={anchor}>{trigger}</div>
				{childrens}
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
	children,
	className,
	placement = 'top-center',
	...rest
}: TooltipContentProps) => {
	const { open, anchor, content } = useTooltip();

	React.useLayoutEffect(() => {
		const element = content.current;
		const trigger = anchor.current;
		if (!element || !trigger) return;

		setPosition({
			gap: 6,
			element,
			placement,
			anchor: trigger.getBoundingClientRect(),
		});
	}, [open, content, anchor, placement]);

	return ReactDOM.createPortal(
		<div
			ref={content}
			className={cn(
				'absolute z-50 pointer-events-none',
				'transition-opacity duration-300 ease-in-out',
				{
					'opacity-100 visible': open,
					'opacity-0 invisible': !open,
				}
			)}
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
