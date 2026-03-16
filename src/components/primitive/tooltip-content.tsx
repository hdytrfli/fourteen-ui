import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cn } from '@/libs/utils';
import { useTooltip } from '@/hooks/use-tooltip';

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

interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode;
	placement?: Placement;
	ref?: React.Ref<HTMLDivElement>;
}

const getPosition = (anchor: DOMRect, width: number, height: number, placement: Placement) => {
	const gap = 6;
	const positions = {
		'bottom-left': {
			top: anchor.bottom + gap,
			left: anchor.left,
		},
		'bottom-center': {
			top: anchor.bottom + gap,
			left: anchor.left + anchor.width / 2 - width / 2,
		},
		'bottom-right': {
			top: anchor.bottom + gap,
			left: anchor.right - width,
		},
		'top-left': {
			top: anchor.top - height - gap,
			left: anchor.left,
		},
		'top-center': {
			top: anchor.top - height - gap,
			left: anchor.left + anchor.width / 2 - width / 2,
		},
		'top-right': {
			top: anchor.top - height - gap,
			left: anchor.right - width,
		},
		'right-top': {
			top: anchor.top,
			left: anchor.right + gap,
		},
		'right-center': {
			top: anchor.top + anchor.height / 2 - height / 2,
			left: anchor.right + gap,
		},
		'right-bottom': {
			top: anchor.bottom - height,
			left: anchor.right + gap,
		},
		'left-top': {
			top: anchor.top,
			left: anchor.left - width - gap,
		},
		'left-center': {
			top: anchor.top + anchor.height / 2 - height / 2,
			left: anchor.left - width - gap,
		},
		'left-bottom': {
			top: anchor.bottom - height,
			left: anchor.left - width - gap,
		},
	};

	return positions[placement];
};

/**
 * Tooltip content that portals to document.body.
 */
export const TooltipContent = ({
	children,
	placement = 'top-center',
	className,
	ref,
	...rest
}: Props) => {
	const { open, anchor } = useTooltip();
	const local = React.useRef<HTMLDivElement>(null);
	const external = (ref as React.RefObject<HTMLDivElement>) || local;

	React.useLayoutEffect(() => {
		const el = external.current;
		const tooltip = anchor.current;

		if (!el || !tooltip || !open) return;

		const naturalWidth = el.offsetWidth;
		const naturalHeight = el.offsetHeight;
		const content = tooltip.getBoundingClientRect();
		const { top, left } = getPosition(content, naturalWidth, naturalHeight, placement);

		Object.assign(el.style, {
			top: top + window.scrollY + 'px',
			left: left + window.scrollX + 'px',
		});
	}, [open, anchor, placement, external]);

	if (!open) return null;

	return ReactDOM.createPortal(
		<div
			ref={external}
			className={cn(
				'absolute z-50',
				'pointer-events-none',
				'max-w-48 wrap-break-words',
				'bg-background text-foreground',
				'text-xs font-medium text-center',
				'px-4 py-2 rounded-2xl border border-border',
				className
			)}
			{...rest}>
			{children}
		</div>,
		document.body
	);
};
