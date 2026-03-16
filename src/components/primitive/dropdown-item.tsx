import * as React from 'react';
import { cn } from '@/libs/utils';
import { type LucideIcon } from 'lucide-react';
import type { ClassValue } from 'clsx';

type Variant = 'primary' | 'destructive';

interface Props extends React.ComponentProps<'button'> {
	label: string;
	icon?: LucideIcon;
	variant?: Variant;
}

/**
 * A single item inside a DropdownContent.
 * @param label - Display text for the item
 * @param icon - Optional Lucide icon component
 */
export const DropdownItem = ({
	label,
	variant = 'primary',
	icon: Icon,
	className,
	...rest
}: Props) => {
	const variants: Record<Variant, ClassValue> = {
		primary: 'bg-background text-zinc-300 hover:bg-border hover:text-foreground',
		destructive: 'bg-background text-zinc-300 hover:bg-rose-700 hover:text-foreground',
	};

	return (
		<button
			className={cn(
				'cursor-pointer',
				'rounded-lg gap-2 px-3 py-2',
				'text-sm font-medium text-left',
				'transition-colors duration-200',
				'w-full flex items-center justify-between',
				'focus-visible:ring-2 focus-visible:ring-accent outline-none',
				variants[variant],
				className
			)}
			{...rest}>
			<span>{label}</span>
			{Icon && <Icon size={14} aria-hidden />}
		</button>
	);
};
