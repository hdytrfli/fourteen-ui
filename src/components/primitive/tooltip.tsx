import * as React from 'react';
import { cn } from '@/libs/utils';
import { TooltipContext } from '@/hooks/use-tooltip';

interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode;
	delay?: number;
}

/**
 * Tooltip root that manages open state and wires the trigger child.
 * @param delay - Delay in ms before tooltip appears (default: 500)
 */
export const Tooltip = ({ children, className, delay = 500, ...rest }: Props) => {
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef<HTMLDivElement>(null);
	const anchor = React.useRef<HTMLDivElement>(null);
	const timer = React.useRef<number | null>(null);

	const openTooltip = () => {
		if (timer.current) window.clearTimeout(timer.current);
		timer.current = window.setTimeout(() => setOpen(true), delay);
	};

	const closeTooltip = () => {
		if (timer.current) window.clearTimeout(timer.current);
		setOpen(false);
	};

	React.useEffect(() => {
		return () => {
			if (timer.current) window.clearTimeout(timer.current);
		};
	}, []);

	const [trigger, ...content] = React.Children.toArray(children);

	return (
		<TooltipContext.Provider value={{ open, setOpen, anchor }}>
			<div
				ref={ref}
				className={cn('relative w-fit', className)}
				onMouseEnter={openTooltip}
				onMouseLeave={closeTooltip}
				{...rest}>
				<div ref={anchor}>{trigger}</div>
				{content}
			</div>
		</TooltipContext.Provider>
	);
};
