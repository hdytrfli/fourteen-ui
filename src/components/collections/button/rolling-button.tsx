import * as React from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import type { IconPosition } from '@/libs/types';
import { DURATION, EASE, STAGGER } from '@/libs/constants';
import { Button } from '@/components/primitive/button';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon?: LucideIcon;
	position?: IconPosition;
	reversed?: boolean;
}

const positions = {
	start: 'flex-row-reverse',
	end: 'flex-row',
} as const;

const OFFSET = 150;

/**
 * Button with staggered character roll animation on hover.
 * Text rolls in one direction on each hover. Icon (if provided) stays static.
 * @param label - Button text
 * @param icon - Optional Lucide icon
 * @param position - Icon position 'start' or 'end' (default: 'start')
 * @param direction - Roll direction 'left' or 'right' (default: 'left')
 */
export const RollingButton = ({
	label,
	icon: Icon,
	reversed = false,
	position = 'start',
	className,
	...rest
}: Props) => {
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const textRef = React.useRef<HTMLSpanElement>(null);
	const nextRef = React.useRef<HTMLSpanElement>(null);
	const isAnimatingRef = React.useRef(false);

	React.useLayoutEffect(() => {
		const button = buttonRef.current;
		const nextElement = nextRef.current;
		const currentElement = textRef.current;
		if (!button || !currentElement || !nextElement) return;

		const initial = SplitText.create(currentElement, { type: 'chars' });
		const replaced = SplitText.create(nextElement, { type: 'chars' });

		const DIRECTION = reversed ? -1 : 1;
		const states = {
			enter: { yPercent: 0, opacity: 1 },
			exit: { yPercent: -1 * OFFSET * DIRECTION, opacity: 0 },
		} as const;

		gsap.set(initial.chars, states.enter);
		gsap.set(replaced.chars, { yPercent: OFFSET * DIRECTION, opacity: 0 });

		const animate = () => {
			if (isAnimatingRef.current) return;
			isAnimatingRef.current = true;

			const timeline = gsap.timeline({
				defaults: {
					ease: EASE.default,
					duration: DURATION.base,
				},
				onComplete: () => {
					isAnimatingRef.current = false;
					gsap.set(initial.chars, states.enter);
					gsap.set(replaced.chars, { yPercent: OFFSET * DIRECTION, opacity: 0 });
				},
			});

			timeline
				.to(initial.chars, {
					opacity: 0,
					yPercent: -1 * OFFSET * DIRECTION,
					stagger: STAGGER.tight,
				})
				.to(
					replaced.chars,
					{
						opacity: 1,
						yPercent: 0,
						stagger: STAGGER.tight,
					},
					0
				);
		};

		button.addEventListener('mouseenter', animate);

		return () => {
			button.removeEventListener('mouseenter', animate);
			initial.revert();
			replaced.revert();
		};
	}, [reversed]);

	return (
		<Button
			ref={buttonRef}
			aria-label={label}
			className={cn('overflow-hidden', className)}
			{...rest}>
			<span className={cn('flex items-center gap-2', positions[position])}>
				<span className='relative inline-flex px-1'>
					<span aria-hidden className='invisible'>
						{label}
					</span>
					<span ref={textRef} className='absolute inset-0 block'>
						{label}
					</span>
					<span ref={nextRef} className='absolute inset-0 block'>
						{label}
					</span>
				</span>
				{Icon && <Icon size={16} aria-hidden />}
			</span>
		</Button>
	);
};
