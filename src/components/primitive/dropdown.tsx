import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { ClassValue } from 'clsx';
import { type LucideIcon } from 'lucide-react';

import { cn, setPosition } from '@/libs/utils';
import type { IconPosition, Placement } from '@/libs/types';
import { DropdownContext, useDropdown } from '@/hooks/use-dropdown';

type Variant = 'click' | 'hover';

interface DropdownProps extends React.ComponentProps<'div'> {
	variant?: Variant;
	defaultOpen?: boolean;
	children: React.ReactNode;
}

/**
 * Dropdown root that manages open state and wires the trigger child.
 * @param variant - Variant of the dropdown 'click' or 'hover' (default: click)
 * @param children - Children to render inside the dropdown
 * @param defaultOpen - Whether the dropdown should open by default
 */
export const Dropdown = ({
	children,
	variant = 'click',
	defaultOpen = false,
	className,
	...rest
}: DropdownProps) => {
	const [open, setOpen] = React.useState(defaultOpen);

	const ref = React.useRef<HTMLDivElement>(null);
	const trigger = React.useRef<HTMLDivElement>(null);
	const content = React.useRef<HTMLDivElement>(null);

	const toggle = () => setOpen((prev) => !prev);
	const openMenu = () => setOpen(true);
	const closeMenu = () => setOpen(false);

	React.useEffect(() => {
		if (variant !== 'click') return;

		const handleClickOutside = (e: MouseEvent) => {
			if (!ref.current || !content.current) return;
			if (ref.current.contains(e.target as Node)) return;
			if (content.current.contains(e.target as Node)) return;
			closeMenu();
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [variant]);

	const [first, ...childrens] = React.Children.toArray(children);
	const props = variant === 'click' ? { onClick: toggle } : { onMouseEnter: openMenu };

	return (
		<DropdownContext.Provider value={{ open, toggle, trigger, content }}>
			<div
				ref={ref}
				className={cn('relative w-fit', className)}
				onMouseLeave={variant === 'hover' ? closeMenu : undefined}
				{...rest}>
				<div ref={trigger}>{React.cloneElement(first as React.ReactElement, props)}</div>
				{childrens}
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
 * @param children - Children to render inside the panel
 * @param placement - Placement of the dropdown panel
 */
export const DropdownContent: React.FC<DropdownContentProps> = ({
	children,
	className,
	placement = 'bottom-left',
	...rest
}) => {
	const { open, trigger, content } = useDropdown();

	React.useLayoutEffect(() => {
		const element = content.current;
		const anchor = trigger.current;
		if (!element || !anchor) return;

		setPosition({
			gap: 6,
			anchor,
			element,
			placement,
		});
	}, [open, content, trigger, placement]);

	if (!open) return null;

	return ReactDOM.createPortal(
		<div
			role='menu'
			ref={content}
			aria-modal='false'
			className='absolute z-50 pointer-events-auto'
			{...rest}>
			<div
				className={cn(
					'border p-1',
					'flex flex-col',
					'rounded-xl bg-background',
					'w-full min-w-60 overflow-hidden',
					className
				)}>
				{children}
			</div>
		</div>,
		document.body
	);
};

type ItemVariant = 'primary' | 'destructive';

interface DropdownActionProps extends React.ComponentProps<'button'> {
	label: string;
	icon?: LucideIcon;
	variant?: ItemVariant;
	position?: IconPosition;
}

const positions: Record<IconPosition, ClassValue> = {
	start: 'flex-row-reverse justify-end',
	end: 'flex-row justify-between',
} as const;

const styles = cn(
	'gap-3 p-3',
	'rounded-lg',
	'w-full flex items-center',
	'text-sm font-medium text-left'
);

/**
 * A single action inside a DropdownContent.
 * @param icon - Icon to display
 * @param label - Label to display
 * @param variant - Variant of the action
 * @param position - Position of the action
 * @param children - Children to render inside the action
 */
export const DropdownAction: React.FC<DropdownActionProps> = ({
	label,
	variant = 'primary',
	position = 'end',
	icon: Icon,
	className,
	...rest
}) => {
	const variants: Record<ItemVariant, ClassValue> = {
		primary: 'bg-background text-text hover:bg-ghost hover:text-foreground',
		destructive: 'bg-background text-text hover:bg-destructive hover:text-light',
	};

	return (
		<button
			className={cn(
				styles,
				variants[variant],
				positions[position],
				'cursor-pointer outline-none',
				'focus-visible:ring-2 focus-visible:ring-accent',
				className
			)}
			{...rest}>
			<span>{label}</span>
			{Icon && <Icon size={14} aria-hidden />}
		</button>
	);
};

interface DropdownItemProps extends React.ComponentProps<'div'> {
	label: string;
}

/**
 * A non button item inside a DropdownContent.
 */
export const DropdownItem: React.FC<DropdownItemProps> = ({
	label,
	children,
	className,
	...rest
}) => {
	return (
		<div className={cn(styles, 'flex items-center justify-between gap-3', className)} {...rest}>
			<span>{label}</span>
			{children}
		</div>
	);
};

interface DropdownDividerProps extends React.ComponentProps<'hr'> {
	//
}

/**
 * A divider inside a DropdownContent.
 */
export const DropdownDivider: React.FC<DropdownDividerProps> = ({ className, ...rest }) => {
	return <hr className={cn('border-b border-dashed my-1', className)} {...rest} />;
};
