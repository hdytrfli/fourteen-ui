import * as React from 'react';
import { cn } from '@/libs/utils';
import { type LucideIcon } from 'lucide-react';

interface Props extends React.ComponentProps<'button'> {
	label: string;
	icon?: LucideIcon;
}

/**
 * A single item inside a DropdownContent.
 * @param label - Display text for the item
 * @param icon - Optional Lucide icon component
 */
export const DropdownItem = ({ label, icon: Icon, className, ...rest }: Props) => {
	return (
		<button
			className={cn(
				'rounded-xl gap-2 px-3 py-2',
				'text-sm font-medium text-left',
				'transition-colors duration-150',
				'w-full flex items-center justify-between',
				'focus-visible:ring-2 focus-visible:ring-foreground outline-none',
				'text-zinc-300 cursor-pointer hover:bg-foreground hover:text-background',
				className
			)}
			{...rest}>
			<span>{label}</span>
			{Icon && <Icon size={14} aria-hidden />}
		</button>
	);
};
