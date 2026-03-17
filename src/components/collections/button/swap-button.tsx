import * as React from 'react';
import { gsap } from 'gsap';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import { DURATION, EASE } from '@/libs/constants';
import type { IconPosition } from '@/libs/types';
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
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const textRef = React.useRef<HTMLSpanElement>(null);
	const nextRef = React.useRef<HTMLSpanElement>(null);
	const isAnimatingRef = React.useRef(false);

	React.useLayoutEffect(() => {
		const button = buttonRef.current;
		const nextElement = nextRef.current;
		const currentElement = textRef.current;
		if (!button || !currentElement || !nextElement) return;

		const states = {
			visible: { yPercent: 0, opacity: 1 },
			hidden: { yPercent: 150, opacity: 0 },
			exit: { yPercent: -150, opacity: 0 },
		} as const;

		gsap.set(currentElement, states.visible);
		gsap.set(nextElement, states.hidden);

		const animate = () => {
			if (isAnimatingRef.current) return;
			isAnimatingRef.current = true;

			const timeline = gsap.timeline({
				defaults: { duration: DURATION.base, ease: EASE.default },
				onComplete: () => {
					isAnimatingRef.current = false;
					gsap.set(nextElement, states.hidden);
					gsap.set(currentElement, states.visible);
				},
			});

			timeline
				.to(currentElement, { yPercent: -150, opacity: 0 })
				.fromTo(nextElement, { yPercent: 150, opacity: 0 }, { yPercent: 0, opacity: 1 }, 0);
		};

		button.addEventListener('mouseenter', animate);

		return () => {
			button.removeEventListener('mouseenter', animate);
			gsap.killTweensOf([currentElement, nextElement]);
		};
	}, []);

	return (
		<Button
			ref={buttonRef}
			aria-label={label}
			className={cn('overflow-hidden', className)}
			{...rest}>
			<span className={cn('flex items-center gap-2', positions[position])}>
				<span className='relative inline-flex'>
					<span ref={textRef} className='block'>
						{label}
					</span>
					<span ref={nextRef} className='absolute inset-0 block opacity-0'>
						{label}
					</span>
				</span>
				{Icon && <Icon size={16} aria-hidden />}
			</span>
		</Button>
	);
};
