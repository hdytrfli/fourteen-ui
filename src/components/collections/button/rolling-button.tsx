import * as React from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import type { IconPosition } from '@/libs/types';
import { DURATION, EASE, STAGGER, VALUES } from '@/libs/constants';

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
	const animating = React.useRef(false);
	const next = React.useRef<HTMLSpanElement>(null);
	const current = React.useRef<HTMLSpanElement>(null);
	const button = React.useRef<HTMLButtonElement>(null);

	React.useLayoutEffect(() => {
		const nextElement = next.current;
		const currentElement = current.current;
		const buttonElement = button.current;
		if (!buttonElement || !currentElement || !nextElement) return;

		const initial = SplitText.create(currentElement, { type: 'chars' });
		const replaced = SplitText.create(nextElement, { type: 'chars' });

		const OFFSET = reversed ? -150 : 150;

		const states = {
			visible: { yPercent: VALUES.zero, opacity: VALUES.visible },
			hidden: { yPercent: OFFSET, opacity: VALUES.hidden },
		} as const;

		gsap.set(initial.chars, states.visible);
		gsap.set(replaced.chars, states.hidden);

		const animate = () => {
			if (animating.current) return;
			animating.current = true;

			const timeline = gsap.timeline({
				defaults: { ease: EASE.default, duration: DURATION.base, stagger: STAGGER.tight },
				onComplete: () => {
					animating.current = false;
					gsap.set(initial.chars, states.visible);
					gsap.set(replaced.chars, states.hidden);
				},
			});

			timeline
				.to(initial.chars, { yPercent: -OFFSET, opacity: VALUES.hidden })
				.fromTo(
					replaced.chars,
					{ yPercent: OFFSET, opacity: VALUES.hidden },
					{ yPercent: VALUES.zero, opacity: VALUES.visible },
					0
				);
		};

		buttonElement.addEventListener('mouseenter', animate);

		return () => {
			buttonElement.removeEventListener('mouseenter', animate);
			initial.revert();
			replaced.revert();
		};
	}, [reversed]);

	return (
		<Button
			ref={button}
			aria-label={label}
			className={cn('overflow-hidden', positions[position], className)}
			{...rest}>
			<span className='relative *:block'>
				<span ref={current}>{label}</span>
				<span ref={next} className='absolute inset-0'>
					{label}
				</span>
			</span>
			{Icon && <Icon size={16} aria-hidden />}
		</Button>
	);
};
