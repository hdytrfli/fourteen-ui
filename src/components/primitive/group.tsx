import * as React from 'react';

import { cn } from '@/libs/utils';

interface GroupProps extends React.ComponentProps<'div'> {
	invalid?: boolean;
	focusable?: boolean;
	children: React.ReactNode;
}

/**
 * Group container for input groups with focus ring and rounded corners.
 */
export const Group = ({
	children,
	className,
	invalid = false,
	focusable = true,
	...rest
}: GroupProps) => {
	return (
		<div
			className={cn(
				'flex items-center',
				'rounded-xl overflow-hidden',
				'**:rounded-none **:focus-visible:ring-0 **:ring-0',
				{ 'focus-within:ring-2 focus-within:ring-accent': focusable },
				{ 'ring-2 ring-destructive': invalid },
				className
			)}
			{...rest}>
			{children}
		</div>
	);
};

interface GroupItemProps extends React.ComponentProps<'div'> {
	children: React.ReactNode;
}

/**
 * Group item wrapper for prefix/suffix content.
 */
export const GroupItem = ({ children, className, ...rest }: GroupItemProps) => {
	return (
		<div
			className={cn('px-4 h-12 bg-ghost', 'flex items-center justify-center', className)}
			{...rest}>
			{children}
		</div>
	);
};
