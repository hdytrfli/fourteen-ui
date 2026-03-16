import * as React from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import type { IconPosition } from '@/libs/types';
import { Button } from '@/components/primitive/button';
import { DURATION, EASE, STAGGER, VALUES } from '@/libs/constants';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon?: LucideIcon;
	position?: IconPosition;
}

const positions = {
	start: 'flex-row-reverse',
	end: 'flex-row',
} as const;

const JUMP_HEIGHT = -6;

/**
 * Button with kinetic text that bounces on hover.
 * @param label - Visible button text
 * @param icon - Optional Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end' (default: 'start')
 */
export const KineticButton = ({
	label,
	icon: Icon,
	position = 'start',
	className,
	...rest
}: Props) => {
	const ref = React.useRef<HTMLButtonElement>(null);
	const text = React.useRef<HTMLSpanElement>(null);
	const icon = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const element = ref.current;
		const textElement = text.current;
		const iconElement = icon.current;
		if (!element || !textElement) return;

		const split = SplitText.create(textElement, { type: 'words, chars' });
		gsap.set(split.chars, { y: VALUES.zero });
		if (iconElement) gsap.set(iconElement, { y: VALUES.zero });

		const timeline = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.base, ease: EASE.default },
		});

		const first = position === 'start';
		const delay = first ? VALUES.zero : split.chars.length * STAGGER.base;

		if (iconElement) {
			timeline.to(
				iconElement,
				{ y: JUMP_HEIGHT, duration: DURATION.base, ease: EASE.default },
				delay
			);
			timeline.to(
				iconElement,
				{ y: VALUES.zero, duration: DURATION.base, ease: EASE.default },
				delay + DURATION.base
			);
		}

		split.chars.forEach((char, index) => {
			const charDelay = first ? (index + VALUES.one) * STAGGER.base : index * STAGGER.base;
			timeline.to(char, { y: JUMP_HEIGHT, duration: DURATION.base, ease: EASE.default }, charDelay);
			timeline.to(
				char,
				{ y: VALUES.zero, duration: DURATION.base, ease: EASE.default },
				charDelay + DURATION.base
			);
		});

		const play = () => timeline.play();
		const reverse = () => timeline.reverse();

		element.addEventListener('mouseenter', play);
		element.addEventListener('mouseleave', reverse);

		return () => {
			element.removeEventListener('mouseenter', play);
			element.removeEventListener('mouseleave', reverse);
			split.revert();
			timeline.kill();
		};
	}, [position]);

	return (
		<Button ref={ref} aria-label={label} className={cn('overflow-visible', className)} {...rest}>
			<span
				className={cn(
					'relative flex items-center gap-2 pointer-events-none select-none',
					Icon && positions[position]
				)}>
				<span ref={text} className='flex gap-1'>
					{label}
				</span>
				{Icon && (
					<span ref={icon} aria-hidden className='flex items-center'>
						<Icon size={16} />
					</span>
				)}
			</span>
		</Button>
	);
};
