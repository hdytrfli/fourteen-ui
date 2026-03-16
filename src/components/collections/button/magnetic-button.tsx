import * as React from 'react';
import { gsap } from 'gsap';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import type { IconPosition } from '@/libs/types';
import { DURATION, EASE } from '@/libs/constants';
import { Button } from '@/components/primitive/button';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon?: LucideIcon;
	position?: IconPosition;
}

const variants = {
	position: {
		start: 'flex-row-reverse',
		end: 'flex-row',
	},
} as const;

/**
 * Button that physically follows the cursor on hover and snaps back on leave.
 * @param label - Visible button text
 * @param icon - Optional Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end' of the label (default: 'start')
 */
export const MagneticButton = ({
	label,
	icon: Icon,
	position = 'start',
	className,
	...rest
}: Props) => {
	const ref = React.useRef<HTMLButtonElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const handleMove = (e: MouseEvent) => {
			const { left, top, width, height } = el.getBoundingClientRect();
			const cx = left + width / 2;
			const cy = top + height / 2;

			gsap.to(el, {
				x: (e.clientX - cx) * 0.3,
				y: (e.clientY - cy) * 0.3,
				duration: DURATION.base,
				ease: EASE.out,
			});
		};

		const handleLeave = () => {
			gsap.to(el, {
				x: 0,
				y: 0,
				duration: DURATION.slow,
				ease: EASE.out,
			});
		};

		el.addEventListener('mousemove', handleMove);
		el.addEventListener('mouseleave', handleLeave);

		return () => {
			el.removeEventListener('mousemove', handleMove);
			el.removeEventListener('mouseleave', handleLeave);
		};
	}, []);

	return (
		<Button ref={ref} aria-label={label} className={cn(className)} {...rest}>
			<span
				className={cn(
					'flex items-center gap-2',
					'pointer-events-none select-none',
					Icon && variants.position[position]
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
