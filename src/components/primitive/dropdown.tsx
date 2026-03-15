import * as React from 'react';
import { cn } from '@/libs/utils';
import { DropdownContext } from '@/hooks/use-dropdown';

interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode;
}

/**
 * Dropdown root that manages open state and wires the trigger child.
 * @param children - A trigger element followed by a DropdownContent component
 */
export const Dropdown = ({ children, className, ...rest }: Props) => {
	const [open, setOpen] = React.useState(false);
	const ref = React.useRef<HTMLDivElement>(null);

	const toggle = () => setOpen((prev) => !prev);
	const close = () => setOpen(false);

	React.useLayoutEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) close();
		};

		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, []);

	const [trigger, ...rest_children] = React.Children.toArray(children);

	return (
		<DropdownContext.Provider value={{ open, toggle }}>
			<div ref={ref} className={cn('relative w-fit', className)} {...rest}>
				{React.cloneElement(trigger as React.ReactElement<{ onClick: () => void }>, { onClick: toggle })}
				{rest_children}
			</div>
		</DropdownContext.Provider>
	);
};
