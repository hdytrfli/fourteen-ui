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
	const ref = React.useRef<HTMLButtonElement>(null);
	const iconRef = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const element = ref.current;
		const iconElement = iconRef.current;
		if (!element || !iconElement) return;

		const from = position === 'start' ? -16 : 16;
		const padding = position === 'start' ? 'paddingLeft' : 'paddingRight';

		gsap.set(iconElement, { x: from, opacity: 0 });

		const timeline = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.base, ease: EASE.default },
		});

		timeline.to(element, { [padding]: 40 }).to(iconElement, { x: 0, opacity: 1 }, 0);

		const play = () => timeline.play();
		const reverse = () => timeline.reverse();

		element.addEventListener('mouseenter', play);
		element.addEventListener('mouseleave', reverse);

		return () => {
			element.removeEventListener('mouseenter', play);
			element.removeEventListener('mouseleave', reverse);
			timeline.kill();
		};
	}, [position]);

	return (
		<Button ref={ref} aria-label={label} className={className} {...rest}>
			<span
				className={cn(
					'flex items-center gap-2 pointer-events-none select-none',
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
