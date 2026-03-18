import * as React from 'react';
import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode;
}

/**
 * Card body with scrollable content area.
 * @param children - Any content to display inside the card
 */
export const CardContent = ({ children, className, ...rest }: Props) => {
	return (
		<div
			className={cn('px-6 py-5', 'text-foreground overflow-y-auto scrollbar-none', className)}
			{...rest}>
			{children}
		</div>
	);
};
