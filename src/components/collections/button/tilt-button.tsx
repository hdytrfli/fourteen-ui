import * as React from 'react';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import type { IconPosition } from '@/libs/types';
import { Button } from '@/components/primitive/button';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon?: LucideIcon;
	position?: IconPosition;
}

const positions = {
	start: 'flex-row-reverse',
	end: 'flex-row',
} as const;

/**
 * Button with an icon that tilts slightly on hover.
 * @param label - Visible button text
 * @param icon - Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end' (default: 'start')
 */
export const TiltButton = ({
	label,
	icon: Icon,
	position = 'start',
	className,
	...rest
}: Props) => {
	return (
		<Button
			aria-label={label}
			className={cn('transition-transform duration-300 ease-in-out hover:-rotate-3', className)}
			{...rest}>
			<span
				className={cn(
					'flex items-center gap-2 pointer-events-none select-none',
					positions[position]
				)}>
				<span>{label}</span>
				{Icon && <Icon size={16} aria-hidden />}
			</span>
		</Button>
	);
};
