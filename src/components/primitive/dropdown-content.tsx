import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cn } from '@/libs/utils';
import { useDropdown } from '@/hooks/use-dropdown';

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
}

const getPosition = (anchor: DOMRect, el: DOMRect, placement: Placement) => {
	const positions = {
		'bottom-left': { top: anchor.bottom, left: anchor.left },
		'bottom-center': { top: anchor.bottom, left: anchor.left + anchor.width / 2 - el.width / 2 },
		'bottom-right': { top: anchor.bottom, left: anchor.right - el.width },
		'top-left': { top: anchor.top - el.height, left: anchor.left },
		'top-center': {
			top: anchor.top - el.height,
			left: anchor.left + anchor.width / 2 - el.width / 2,
		},
		'top-right': { top: anchor.top - el.height, left: anchor.right - el.width },
		'right-top': { top: anchor.top, left: anchor.right },
		'right-center': { top: anchor.top + anchor.height / 2 - el.height / 2, left: anchor.right },
		'right-bottom': { top: anchor.bottom - el.height, left: anchor.right },
		'left-top': { top: anchor.top, left: anchor.left - el.width },
		'left-center': {
			top: anchor.top + anchor.height / 2 - el.height / 2,
			left: anchor.left - el.width,
		},
		'left-bottom': { top: anchor.bottom - el.height, left: anchor.left - el.width },
	};

	return positions[placement];
};

/**
 * Dropdown panel that portals to document.body to escape stacking context issues.
 * @param children - DropdownItem components
 * @param placement - Where the dropdown appears relative to the trigger (default: 'bottom-left')
 */
export const DropdownContent = ({
	children,
	placement = 'bottom-left',
	className,
	...rest
}: Props) => {
	const { open, anchor } = useDropdown();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		const dropdown = anchor.current;

		if (!el || !dropdown || !open) return;
		const content = dropdown.getBoundingClientRect();
		const wrapper = el.getBoundingClientRect();
		const { top, left } = getPosition(content, wrapper, placement);

		Object.assign(el.style, {
			top: top + window.scrollY + 'px',
			left: left + window.scrollX + 'px',
		});
	}, [open, anchor, placement]);

	if (!open) return null;
	const horizontal = placement.startsWith('left') || placement.startsWith('right');

	return ReactDOM.createPortal(
		<div
			ref={ref}
			role='menu'
			aria-modal='false'
			className={cn(
				'absolute z-50 min-w-48',
				{
					'px-2': horizontal,
					'py-2': !horizontal,
					'visible pointer-events-auto': open,
					'invisible pointer-events-none': !open,
				},
				className
			)}
			{...rest}>
			<div
				className={cn(
					'p-1 w-full',
					'flex flex-col gap-1',
					'border border-border',
					'overflow-hidden rounded-xl bg-background'
				)}>
				{children}
			</div>
		</div>,
		document.body
	);
};
