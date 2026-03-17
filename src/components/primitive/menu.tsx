import * as React from 'react';
import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'ul'> {
	children: React.ReactNode;
}

/**
 * Menu root component that renders a vertical list of items.
 * @param children - MenuItem components
 */
export const Menu = ({ children, className, ...rest }: Props) => {
	return (
		<ul className={cn('flex flex-col gap-1', 'w-full min-w-48', className)} {...rest}>
			{children}
		</ul>
	);
};
