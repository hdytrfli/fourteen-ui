import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cn } from '@/libs/utils';
import { DropdownContext, useDropdown } from '@/hooks/use-dropdown';
import { type LucideIcon } from 'lucide-react';
import type { ClassValue } from 'clsx';
import type { IconPosition } from '@/libs/types';

type Variant = 'click' | 'hover';

interface DropdownProps extends React.ComponentProps<'div'> {
	children: React.ReactNode;
	variant?: Variant;
}

/**
 * Dropdown root that manages open state and wires the trigger child.
 */
export const Dropdown = ({ children, variant = 'click', className, ...rest }: DropdownProps) => {
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef<HTMLDivElement>(null);
	const anchor = React.useRef<HTMLDivElement>(null);

	const toggle = () => setOpen((prev) => !prev);
	const openMenu = () => setOpen(true);
	const closeMenu = () => setOpen(false);

	React.useLayoutEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) closeMenu();
		};
		if (variant === 'click') document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [variant]);

	const [trigger, ...content] = React.Children.toArray(children);
	const props = variant === 'click' ? { onClick: toggle } : { onMouseEnter: openMenu };

	return (
		<DropdownContext.Provider value={{ open, toggle, anchor }}>
			<div
				ref={ref}
				className={cn('relative w-fit', className)}
				onMouseLeave={variant === 'hover' ? closeMenu : undefined}
				{...rest}>
				<div ref={anchor}>
					{React.cloneElement(trigger as React.ReactElement<Record<string, unknown>>, props)}
				</div>
				{content}
			</div>
		</DropdownContext.Provider>
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

interface DropdownContentProps extends React.ComponentProps<'div'> {
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
 */
export const DropdownContent = ({
	children,
	placement = 'bottom-left',
	className,
	...rest
}: DropdownContentProps) => {
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
					'border ',
					'overflow-hidden rounded-xl bg-background'
				)}>
				{children}
			</div>
		</div>,
		document.body
	);
};

type ItemVariant = 'primary' | 'destructive';

interface DropdownItemProps extends React.ComponentProps<'button'> {
	label: string;
	icon?: LucideIcon;
	variant?: ItemVariant;
	position?: IconPosition;
}

const positions: Record<IconPosition, ClassValue> = {
	start: 'flex-row-reverse justify-end',
	end: 'flex-row justify-between',
} as const;

/**
 * A single item inside a DropdownContent.
 */
export const DropdownItem = ({
	label,
	variant = 'primary',
	position = 'start',
	icon: Icon,
	className,
	...rest
}: DropdownItemProps) => {
	const variants: Record<ItemVariant, ClassValue> = {
		primary: 'bg-background text-text hover:bg-ghost hover:text-foreground',
		destructive: 'bg-background text-text hover:bg-destructive hover:text-light',
	};

	return (
		<button
			className={cn(
				'rounded-lg',
				'gap-3 p-3 cursor-pointer',
				'w-full flex items-center',
				'text-sm font-medium text-left',
				'focus-visible:ring-2 focus-visible:ring-accent outline-none',
				variants[variant],
				positions[position],
				className
			)}
			{...rest}>
			<span>{label}</span>
			{Icon && <Icon size={14} aria-hidden />}
		</button>
	);
};
