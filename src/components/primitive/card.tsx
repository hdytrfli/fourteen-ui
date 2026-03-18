import * as React from 'react';
import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode;
}

/**
 * Card root container with consistent border, background, and sizing.
 * @param children - CardHeader, CardContent, and optionally CardFooter
 * @param size - Width of the card (default: 'md')
 */
export const Card = ({ children, className, ...rest }: Props) => {
	return (
		<div
			className={cn(
				'rounded-2xl',
				'border ',
				'w-full overflow-hidden',
				'text-foreground bg-background',
				className
			)}
			{...rest}>
			{children}
		</div>
	);
};
