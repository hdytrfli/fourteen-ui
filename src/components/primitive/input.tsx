import * as React from 'react';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import type { IconPosition } from '@/libs/types';

interface Props extends React.ComponentProps<'input'> {
	icon?: LucideIcon;
	invalid?: boolean;
	position?: IconPosition;
}

const paddings = {
	icon: { start: 'left-4', end: 'right-4' },
	input: { start: 'pl-11', end: 'pr-11' },
} as const;

/**
 * Base input component with optional icon.
 * @param icon - Optional Lucide icon component
 * @param position - Whether icon sits at 'start' or 'end' (default: 'start')
 */
export const Input = ({
	icon: Icon,
	invalid = false,
	position = 'start',
	className,
	...rest
}: Props) => {
	return (
		<div className='relative w-full'>
			{Icon && (
				<span
					className={cn(
						'text-foreground',
						'absolute top-1/2 -translate-y-1/2',
						'flex items-center justify-center',
						'pointer-events-none select-none',
						paddings.icon[position]
					)}>
					<Icon size={16} aria-hidden />
				</span>
			)}
			<input
				className={cn(
					'text-sm',
					'input-appearance-none',
					'bg-border text-foreground',
					'w-full h-12 px-4 rounded-xl',
					'disabled:cursor-not-allowed disabled:text-text',
					'focus-visible:ring-2 focus-visible:ring-accent outline-none',
					{ 'ring-2 ring-destructive': invalid },
					Icon && paddings.input[position],
					className
				)}
				{...rest}
			/>
		</div>
	);
};
