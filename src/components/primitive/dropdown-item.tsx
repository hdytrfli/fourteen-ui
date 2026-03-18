import * as React from 'react';
import { cn } from '@/libs/utils';
import { type LucideIcon } from 'lucide-react';
import type { ClassValue } from 'clsx';
import type { IconPosition } from '@/libs/types';

type Variant = 'primary' | 'destructive';

interface Props extends React.ComponentProps<'button'> {
	label: string;
	icon?: LucideIcon;
	variant?: Variant;
	position?: IconPosition;
}

const positions: Record<IconPosition, ClassValue> = {
	start: 'flex-row-reverse justify-end',
	end: 'flex-row justify-between',
} as const;

/**
 * A single item inside a DropdownContent.
 * @param label - Display text for the item
 * @param icon - Optional Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end' (default: 'start')
 */
export const DropdownItem = ({
	label,
	variant = 'primary',
	position = 'start',
	icon: Icon,
	className,
	...rest
}: Props) => {
	const variants: Record<Variant, ClassValue> = {
		primary: 'bg-background text-text hover:bg-border hover:text-foreground',
		destructive: 'bg-background text-text hover:bg-destructive hover:text-foreground',
	};

	return (
		<button
			className={cn(
				'rounded-lg',
				'gap-3 p-3 cursor-pointer',
				'w-full flex items-center',
				'text-sm font-medium text-left',
				'focus-visible:ring-2 focus-visible:ring-accent outline-none',
				variants[variant],
				positions[position],
				className
			)}
			{...rest}>
			<span>{label}</span>
			{Icon && <Icon size={14} aria-hidden />}
		</button>
	);
};
