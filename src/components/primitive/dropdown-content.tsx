import * as React from 'react';
import { cn } from '@/libs/utils';
import { useDropdown } from '@/hooks/use-dropdown';

interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode;
}

/**
 * Dropdown panel that shows and hides based on open state.
 * Extend this component to add animation.
 * @param children - DropdownItem components
 */
export const DropdownContent = ({ children, className, ...rest }: Props) => {
	const { open } = useDropdown();

	return (
		<div
			aria-hidden={!open}
			className={cn(
				'w-fit min-w-40 p-1',
				'rounded-2xl bg-background',
				'absolute top-full left-0 mt-2 z-50!',
				{
					'visible pointer-events-auto': open,
					'invisible pointer-events-none': !open,
				},
				className
			)}
			{...rest}>
			{children}
		</div>
	);
};
