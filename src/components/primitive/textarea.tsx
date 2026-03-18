import * as React from 'react';

import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'textarea'> {
	invalid?: boolean;
}

/**
 * Base textarea component for multi-line text input.
 * @param invalid - Shows error state ring when true
 */
export const Textarea = ({ invalid = false, className, ...rest }: Props) => {
	return (
		<textarea
			className={cn(
				'resize-y text-sm',
				'bg-ghost text-foreground',
				'w-full px-4 py-3 rounded-xl',
				'disabled:cursor-not-allowed disabled:text-text',
				'focus-visible:ring-2 focus-visible:ring-accent outline-none',
				{ 'ring-2 ring-destructive': invalid },
				className
			)}
			{...rest}
		/>
	);
};
