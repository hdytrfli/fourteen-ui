import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { ClassValue } from 'clsx';
import { type LucideIcon } from 'lucide-react';

import { cn, setPosition } from '@/libs/utils';
import type { IconPosition, Placement } from '@/libs/types';
import { DropdownContext, useDropdown } from '@/hooks/use-dropdown';

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

interface DropdownContentProps extends React.ComponentProps<'div'> {
	children: React.ReactNode;
	placement?: Placement;
}

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
		const element = ref.current;
		const dropdown = anchor.current;
		if (!element || !dropdown || !open) return;

		setPosition({
			gap: 6,
			element,
			placement,
			anchor: dropdown.getBoundingClientRect(),
		});
	}, [open, anchor, placement]);

	if (!open) return null;

	return ReactDOM.createPortal(
		<div
			ref={ref}
			role='menu'
			aria-modal='false'
			className={cn('absolute z-50 min-w-48', 'p-1', 'visible pointer-events-auto', className)}
			{...rest}>
			<div
				className={cn(
					'w-full',
					'border',
					'flex flex-col gap-1',
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
