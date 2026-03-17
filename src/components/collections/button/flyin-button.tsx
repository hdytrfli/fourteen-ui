import * as React from 'react';
import { gsap } from 'gsap';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import { DURATION, EASE } from '@/libs/constants';
import type { IconPosition } from '@/libs/types';
import { Button } from '@/components/primitive/button';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon: LucideIcon;
	position?: IconPosition;
}

const positions = {
	start: 'flex-row-reverse',
	end: 'flex-row',
} as const;

/**
 * Button with a label and a Lucide icon that slides in from its natural side on hover.
 * @param label - Visible button text
 * @param icon - Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end' (default: 'start')
 */
export const FlyinButton = ({
	label,
	icon: Icon,
	position = 'start',
	className,
	...rest
}: Props) => {
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const iconRef = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const button = buttonRef.current;
		const iconElement = iconRef.current;
		if (!button || !iconElement) return;

		const states = {
			start: { from: -16, padding: 'paddingLeft' },
			end: { from: 16, padding: 'paddingRight' },
		} as const;

		const { from, padding } = states[position];

		gsap.set(iconElement, { x: from, opacity: 0 });

		const timeline = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.base, ease: EASE.default },
		});

		timeline.to(button, { [padding]: 42 }).to(iconElement, { x: 0, opacity: 1 }, 0);

		const enter = () => timeline.play();
		const leave = () => timeline.reverse();

		button.addEventListener('mouseenter', enter);
		button.addEventListener('mouseleave', leave);

		return () => {
			button.removeEventListener('mouseenter', enter);
			button.removeEventListener('mouseleave', leave);
			timeline.kill();
		};
	}, [position]);

	return (
		<Button ref={buttonRef} aria-label={label} className={className} {...rest}>
			<span
				className={cn(
					'flex items-center gap-5 pointer-events-none select-none',
					positions[position]
				)}>
				<span>{label}</span>
			</span>
			<span
				ref={iconRef}
				aria-hidden
				className={cn('absolute top-1/2 -translate-y-1/2', {
					'left-4': position === 'start',
					'right-4': position === 'end',
				})}>
				<Icon size={16} />
			</span>
		</Button>
	);
};
