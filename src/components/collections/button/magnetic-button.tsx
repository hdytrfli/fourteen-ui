import * as React from 'react';
import { gsap } from 'gsap';
import type { ClassValue } from 'clsx';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import type { IconPosition } from '@/libs/types';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { Button } from '@/components/primitive/button';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon?: LucideIcon;
	position?: IconPosition;
}

const positions: Record<IconPosition, ClassValue> = {
	start: 'flex-row-reverse',
	end: 'flex-row',
} as const;

/**
 * Button that physically follows the cursor on hover and snaps back on leave.
 * @param label - Visible button text
 * @param icon - Optional Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end' (default: 'start')
 */
export const MagneticButton = ({
	label,
	icon: Icon,
	position = 'start',
	className,
	...rest
}: Props) => {
	const buttonRef = React.useRef<HTMLButtonElement>(null);

	React.useLayoutEffect(() => {
		const button = buttonRef.current;
		if (!button) return;

		const states = {
			offset: 0.5,
		} as const;

		const handleMove = (event: MouseEvent) => {
			const rect = button.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			gsap.to(button, {
				x: (event.clientX - centerX) * states.offset,
				y: (event.clientY - centerY) * states.offset,
				duration: DURATION.base,
				ease: EASE.out,
			});
		};

		const handleLeave = () => {
			gsap.to(button, {
				x: VALUES.zero,
				y: VALUES.zero,
				duration: DURATION.base,
				ease: EASE.out,
			});
		};

		button.addEventListener('mousemove', handleMove);
		button.addEventListener('mouseleave', handleLeave);

		return () => {
			button.removeEventListener('mousemove', handleMove);
			button.removeEventListener('mouseleave', handleLeave);
		};
	}, []);

	return (
		<Button ref={buttonRef} aria-label={label} className={cn(className)} {...rest}>
			<span
				className={cn(
					'flex items-center gap-2 pointer-events-none select-none',
					Icon && positions[position]
				)}>
				<span>{label}</span>
				{Icon && (
					<span aria-hidden className='flex items-center'>
						<Icon size={16} />
					</span>
				)}
			</span>
		</Button>
	);
};
