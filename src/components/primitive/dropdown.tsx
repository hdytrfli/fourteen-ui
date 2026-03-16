import * as React from 'react';
import { cn } from '@/libs/utils';
import { DropdownContext } from '@/hooks/use-dropdown';

type Variant = 'click' | 'hover';

interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode;
	variant?: Variant;
}

/**
 * Dropdown root that manages open state and wires the trigger child.
 * @param children - A trigger element followed by a DropdownContent component
 * @param trigger - Whether the dropdown opens on click or hover (default: 'click')
 */
export const Dropdown = ({ children, variant = 'click', className, ...rest }: Props) => {
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
