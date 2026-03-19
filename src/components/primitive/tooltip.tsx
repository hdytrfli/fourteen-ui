import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cn } from '@/libs/utils';
import { TooltipContext, useTooltip } from '@/hooks/use-tooltip';

interface TooltipProps extends React.ComponentProps<'div'> {
	children: React.ReactNode;
	delay?: number;
}

/**
 * Tooltip root that manages open state and wires the trigger child.
 */
export const Tooltip = ({ children, className, delay = 300, ...rest }: TooltipProps) => {
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

type Placement =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'
	| 'left-top'
	| 'left-center'
	| 'left-bottom'
	| 'right-top'
	| 'right-center'
	| 'right-bottom';

interface TooltipContentProps extends React.ComponentProps<'div'> {
	placement?: Placement;
	children: React.ReactNode;
	ref?: React.Ref<HTMLDivElement>;
}

const getPosition = (anchor: DOMRect, width: number, height: number, placement: Placement) => {
	const gap = 6;
	const positions = {
		'bottom-left': { top: anchor.bottom + gap, left: anchor.left },
		'bottom-center': { top: anchor.bottom + gap, left: anchor.left + anchor.width / 2 - width / 2 },
		'bottom-right': { top: anchor.bottom + gap, left: anchor.right - width },
		'top-left': { top: anchor.top - height - gap, left: anchor.left },
		'top-center': {
			top: anchor.top - height - gap,
			left: anchor.left + anchor.width / 2 - width / 2,
		},
		'top-right': { top: anchor.top - height - gap, left: anchor.right - width },
		'right-top': { top: anchor.top, left: anchor.right + gap },
		'right-center': { top: anchor.top + anchor.height / 2 - height / 2, left: anchor.right + gap },
		'right-bottom': { top: anchor.bottom - height, left: anchor.right + gap },
		'left-top': { top: anchor.top, left: anchor.left - width - gap },
		'left-center': {
			top: anchor.top + anchor.height / 2 - height / 2,
			left: anchor.left - width - gap,
		},
		'left-bottom': { top: anchor.bottom - height, left: anchor.left - width - gap },
	};

	return positions[placement];
};

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
		const el = external.current;
		const tooltip = anchor.current;

		if (!el || !tooltip) return;

		const width = el.offsetWidth;
		const height = el.offsetHeight;
		const { top, left } = getPosition(tooltip.getBoundingClientRect(), width, height, placement);

		Object.assign(el.style, {
			top: top + window.scrollY + 'px',
			left: left + window.scrollX + 'px',
		});
	}, [anchor, placement, external]);

	return ReactDOM.createPortal(
		<div
			ref={external}
			className={cn(
				'absolute z-50',
				'pointer-events-none',
				'max-w-48 wrap-break-words',
				'bg-background text-foreground',
				'text-xs font-medium text-center',
				'px-4 py-2 rounded-2xl border ',
				{
					'opacity-100 visible': open,
					'opacity-0 invisible': !open,
				},
				className
			)}
			{...rest}>
			{children}
		</div>,
		document.body
	);
};
