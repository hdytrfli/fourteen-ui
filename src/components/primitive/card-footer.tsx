import * as React from 'react';
import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'footer'> {
	children: React.ReactNode;
}

/**
 * Card footer with a two-column grid for action buttons.
 * @param children - Up to two action buttons
 */
export const CardFooter = ({ children, className, ...rest }: Props) => {
	return (
		<footer
			className={cn(
				'px-6 py-4',
				'bg-background',
				'border-t border-border',
				'grid lg:grid-cols-2 gap-4',
				className
			)}
			{...rest}>
			{children}
		</footer>
	);
};
