import * as React from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import { DURATION, EASE, STAGGER } from '@/libs/constants';
import type { IconPosition, RollingDirection } from '@/libs/types';
import { Button } from '@/components/primitive/button';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon?: LucideIcon;
	position?: IconPosition;
	direction?: RollingDirection;
}

const positions = {
	start: 'flex-row-reverse',
	end: 'flex-row',
} as const;

/**
 * Button with staggered character roll animation on hover.
 * Same text rolls on each hover. Icon (if provided) stays static.
 * @param label - Button text
 * @param icon - Optional Lucide icon
 * @param position - Icon position 'start' or 'end' (default: 'start')
 * @param direction - Roll direction 'left' or 'right' (default: 'left')
 */
export const RollingButton = ({
	label,
	icon: Icon,
	position = 'start',
	direction = 'left',
	className,
	...rest
}: Props) => {
	const ref = React.useRef<HTMLButtonElement>(null);
	const text = React.useRef<HTMLSpanElement>(null);
	const next = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;

		const initial = SplitText.create(text.current, { type: 'words, chars' });
		const replaced = SplitText.create(next.current, { type: 'words, chars' });
		gsap.set(replaced.chars, { yPercent: 150 });

		const timeline = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.base, ease: EASE.default },
		});

		timeline
			.to(initial.chars, {
				yPercent: -150,
				reversed: direction === 'left',
				stagger: STAGGER.base,
			})
			.to(
				replaced.chars,
				{ yPercent: 0, reversed: direction === 'left', stagger: STAGGER.base },
				0
			);

		const play = () => timeline.play();
		const reverse = () => timeline.reverse();

		element.addEventListener('mouseenter', play);
		element.addEventListener('mouseleave', reverse);

		return () => {
			element.removeEventListener('mouseenter', play);
			element.removeEventListener('mouseleave', reverse);
			initial.revert();
			replaced.revert();
			timeline.kill();
		};
	}, [direction]);

	return (
		<Button ref={ref} aria-label={label} className={cn('overflow-hidden', className)} {...rest}>
			<span
				className={cn(
					'flex items-center gap-2 pointer-events-none select-none',
					positions[position]
				)}>
				<span className='relative inline-flex px-1'>
					<span aria-hidden className='invisible'>
						{label}
					</span>
					<span ref={text} className='absolute inset-0 flex overflow-hidden justify-center gap-1'>
						{label}
					</span>
					<span ref={next} className='absolute inset-0 flex overflow-hidden justify-center gap-1'>
						{label}
					</span>
				</span>
				{Icon && <Icon size={16} aria-hidden />}
			</span>
		</Button>
	);
};
