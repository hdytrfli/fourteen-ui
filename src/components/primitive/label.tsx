import * as React from 'react';

import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'label'> {
	children: React.ReactNode;
	required?: boolean;
}

/**
 * Label for form inputs with optional required indicator.
 * @param children - Label text content
 * @param required - Shows required asterisk when true (default: false)
 */
export const Label = ({ children, required, className, ...rest }: Props) => {
	return (
		<label className={cn('block text-sm', 'text-foreground', 'select-none', className)} {...rest}>
			{children}
			{required && <span className='text-accent ml-1'>*</span>}
		</label>
	);
};
