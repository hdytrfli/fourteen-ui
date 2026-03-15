import * as React from 'react';

import { cn } from '@/libs/utils';
import type { ClassValue } from 'clsx';

type Variant = 'primary' | 'secondary' | 'accent';

interface ButtonProps extends React.ComponentProps<'button'> {
	variant: Variant;
}

export const Button: React.FC<ButtonProps> = ({ children, variant, className, ...rest }) => {
	const variants: Record<Variant, ClassValue> = {
		primary: 'bg-background text-foreground',
		secondary: 'bg-foreground text-background',
		accent: 'bg-accent text-foreground',
	};

	return (
		<button
			className={cn(
				'px-6 h-10',
				'flex items-center gap-2',
				'relative text-sm rounded-full font-medium cursor-pointer',
				'focus-visible:ring-2 focus-visible:ring-zinc-500 outline-none',
				variants[variant],
				className
			)}
			{...rest}>
			{children}
		</button>
	);
};
