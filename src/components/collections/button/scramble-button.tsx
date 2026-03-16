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

const variants = {
	position: {
		start: 'flex-row-reverse',
		end: 'flex-row',
	},
} as const;

const SCRAMBLE_CHARS = CHARS.flat().join('');
gsap.registerPlugin(ScrambleTextPlugin);

/**
 * Button that scrambles its label through random characters before resolving on hover.
 * @param label - Visible button text and final resolved value
 */
export const ScrambleButton = ({
	label,
	icon: Icon,
	position = 'end',
	className,
	...rest
}: Props) => {
	const ref = React.useRef<HTMLButtonElement>(null);
	const text = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const tl = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.slow, ease: EASE.inOut },
		});

		tl.to(text.current, {
			scrambleText: {
				text: label,
				chars: SCRAMBLE_CHARS,
				speed: 0.3,
			},
		});

		const play = () => tl.restart();
		const reverse = () => tl.reverse();

		el.addEventListener('mouseenter', play);
		el.addEventListener('mouseleave', reverse);

		return () => {
			el.removeEventListener('mouseenter', play);
			el.removeEventListener('mouseleave', reverse);
			tl.kill();
		};
	}, [label]);

	return (
		<Button ref={ref} aria-label={label} className={className} {...rest}>
			<span
				className={cn(
					'flex items-center gap-2',
					'pointer-events-none select-none',
					Icon && variants.position[position]
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
