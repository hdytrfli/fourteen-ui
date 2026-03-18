import * as React from 'react';

import { cn } from '@/libs/utils';
import type { ClassValue } from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'destructive' | 'ghost';

interface ButtonProps extends React.ComponentProps<'button'> {
	variant: ButtonVariant;
}

/**
 * Button with a variety of styles and states.
 * @param variant - Button style primary, secondary, accent, destructive, or ghost (default: primary)
 */
export const Button: React.FC<ButtonProps> = ({ children, variant, className, ...rest }) => {
	const variants: Record<ButtonVariant, ClassValue> = {
		accent: 'bg-accent text-light',
		ghost: 'bg-ghost text-foreground',
		primary: 'bg-foreground text-background',
		secondary: 'bg-background text-foreground',
		destructive: 'bg-destructive text-light',
	};

	return (
		<button
			className={cn(
				'px-4 h-12 select-none',
				'no-underline flex-none',
				'flex items-center gap-2 justify-center',
				'relative text-sm rounded-xl font-medium cursor-pointer',
				'focus-visible:ring-2 focus-visible:ring-accent outline-none',
				variants[variant],
				className
			)}
			{...rest}>
			{children}
		</button>
	);
};
