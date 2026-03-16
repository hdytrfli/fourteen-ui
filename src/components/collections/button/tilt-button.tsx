import * as React from 'react';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import type { IconPosition } from '@/libs/types';
import { Button } from '@/components/primitive/button';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon: LucideIcon;
	position?: IconPosition;
}

const variants = {
	position: {
		start: 'flex-row-reverse',
		end: 'flex-row',
	},
} as const;

/**
 * Button with an icon that tilts slightly on hover.
 * @param label - Visible button text
 * @param icon - Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end' of the label (default: 'end')
 */
export const TiltButton = ({ label, icon: Icon, position = 'end', className, ...rest }: Props) => {
	return (
		<Button aria-label={label} className={cn('group/tilt-button', className)} {...rest}>
			<span
				className={cn(
					'flex items-center gap-2',
					'pointer-events-none select-none',
					variants.position[position]
				)}>
				<span>{label}</span>
				<span
					aria-hidden
					className='transition-transform duration-300 ease-in-out group-hover/tilt-button:-rotate-12'>
					<Icon size={16} />
				</span>
			</span>
		</Button>
	);
};
