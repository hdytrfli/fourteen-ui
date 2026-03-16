import * as React from 'react';
import { gsap } from 'gsap';
import type { LucideIcon } from 'lucide-react';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

import { cn } from '@/libs/utils';
import type { IconPosition } from '@/libs/types';
import { DURATION, EASE } from '@/libs/constants';
import { Button } from '@/components/primitive/button';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon?: LucideIcon;
	position?: IconPosition;
}

const CHARS = [
	'!@#$%^&*()_+-=[]{}|;:,./<>?',
	'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	'abcdefghijklmnopqrstuvwxyz',
	'0123456789',
] as const;

const positions = {
	start: 'flex-row-reverse',
	end: 'flex-row',
} as const;

const SCRAMBLE_CHARS = CHARS.flat().join('');
gsap.registerPlugin(ScrambleTextPlugin);

/**
 * Button that scrambles its label through random characters before resolving on hover.
 * @param label - Visible button text and final resolved value
 * @param icon - Optional Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end' (default: 'start')
 */
export const ScrambleButton = ({
	label,
	icon: Icon,
	position = 'start',
	className,
	...rest
}: Props) => {
	const ref = React.useRef<HTMLButtonElement>(null);
	const text = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const element = ref.current;
		const textElement = text.current;
		if (!element || !textElement) return;

		const timeline = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.base, ease: EASE.default },
		});

		timeline.to(textElement, {
			scrambleText: {
				text: label,
				chars: SCRAMBLE_CHARS,
				speed: 0.3,
			},
		});

		const play = () => timeline.restart();
		const reverse = () => timeline.reverse();

		element.addEventListener('mouseenter', play);
		element.addEventListener('mouseleave', reverse);

		return () => {
			element.removeEventListener('mouseenter', play);
			element.removeEventListener('mouseleave', reverse);
			timeline.kill();
		};
	}, [label]);

	return (
		<Button ref={ref} aria-label={label} className={className} {...rest}>
			<span
				className={cn(
					'flex items-center gap-2 pointer-events-none select-none',
					positions[position]
				)}>
				<span ref={text}>{label}</span>
				{Icon && (
					<span aria-hidden className='flex items-center'>
						<Icon size={16} />
					</span>
				)}
			</span>
		</Button>
	);
};
