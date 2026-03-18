import * as React from 'react';

import { cn } from '@/libs/utils';

interface FieldProps extends React.ComponentProps<'fieldset'> {
	error?: string;
	description?: string;
	children: React.ReactNode;
}

/**
 * Field container for form inputs with error and description support.
 * Shows error if present, otherwise shows description.
 * @param error - Error message to display (takes precedence over description)
 * @param description - Description or hint text to display below the input
 */
export const Field = ({ error, description, children, className, ...rest }: FieldProps) => {
	const message = error || description;

	return (
		<fieldset className={cn('w-full', 'flex flex-col gap-2', className)} {...rest}>
			{children}
			{message && (
				<span
					role={error ? 'alert' : undefined}
					className={cn('text-sm block', {
						'text-destructive': error,
						'text-text': !error,
					})}>
					{message}
				</span>
			)}
		</fieldset>
	);
};
