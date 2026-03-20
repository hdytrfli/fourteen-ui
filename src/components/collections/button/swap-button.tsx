import * as React from 'react';
import { gsap } from 'gsap';
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

const positions = {
	start: 'flex-row-reverse',
	end: 'flex-row',
} as const;

/**
 * Button with text swap animation on hover.
 * Text slides up and out, same text slides up from below.
 * Icon (if provided) stays static.
 * @param label - Button text
 * @param icon - Optional Lucide icon
 * @param position - Icon position 'start' or 'end' (default: 'start')
 */
export const SwapButton = ({
	label,
	icon: Icon,
	position = 'start',
	className,
	...rest
}: Props) => {
	const animating = React.useRef(false);
	const next = React.useRef<HTMLSpanElement>(null);
	const current = React.useRef<HTMLSpanElement>(null);
	const button = React.useRef<HTMLButtonElement>(null);

	React.useLayoutEffect(() => {
		const buttonElement = button.current;
		const nextElement = next.current;
		const currentElement = current.current;
		if (!buttonElement || !currentElement || !nextElement) return;

		const OFFSET = 150;

		const states = {
			visible: { yPercent: VALUES.zero, opacity: VALUES.visible },
			hidden: { yPercent: OFFSET, opacity: VALUES.hidden },
		} as const;

		gsap.set(currentElement, states.visible);
		gsap.set(nextElement, states.hidden);

		const animate = () => {
			if (animating.current) return;
			animating.current = true;

			const timeline = gsap.timeline({
				defaults: { duration: DURATION.base, ease: EASE.default },
				onComplete: () => {
					animating.current = false;
					gsap.set(currentElement, states.visible);
					gsap.set(nextElement, states.hidden);
				},
			});

			timeline
				.to(currentElement, { yPercent: -OFFSET, opacity: VALUES.hidden })
				.fromTo(
					nextElement,
					{ yPercent: OFFSET, opacity: VALUES.hidden },
					{ yPercent: VALUES.zero, opacity: VALUES.visible },
					0
				);
		};

		buttonElement.addEventListener('mouseenter', animate);

		return () => {
			buttonElement.removeEventListener('mouseenter', animate);
		};
	}, []);

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
