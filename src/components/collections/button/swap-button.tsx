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
	const ref = React.useRef<HTMLButtonElement>(null);
	const text = React.useRef<HTMLSpanElement>(null);
	const next = React.useRef<HTMLSpanElement>(null);
	const animating = React.useRef(false);

	React.useLayoutEffect(() => {
		const element = ref.current;
		const nextText = next.current;
		const currentText = text.current;
		if (!element || !currentText || !nextText) return;

		const animate = () => {
			if (animating.current) return;
			animating.current = true;

			const timeline = gsap.timeline({
				onComplete: () => {
					animating.current = false;
				},
			});

			timeline
				.fromTo(
					currentText,
					{ yPercent: 0, opacity: 1 },
					{
						yPercent: -150,
						opacity: 0,
						duration: DURATION.base,
						ease: EASE.default,
					}
				)
				.fromTo(
					nextText,
					{ yPercent: 150, opacity: 0 },
					{
						yPercent: 0,
						opacity: 1,
						duration: DURATION.base,
						ease: EASE.default,
					},
					0
				);
		};

		element.addEventListener('mouseenter', animate);

		return () => {
			element.removeEventListener('mouseenter', animate);
			gsap.killTweensOf([currentText, nextText]);
		};
	}, []);

	return (
		<Button ref={ref} aria-label={label} className={cn('overflow-hidden', className)} {...rest}>
			<span className={cn('flex items-center gap-2', positions[position])}>
				<span className='relative inline-flex'>
					<span ref={text} className='block'>
						{label}
					</span>
					<span ref={next} className='absolute inset-0 block opacity-0'>
						{label}
					</span>
				</span>
				{Icon && <Icon size={16} aria-hidden />}
			</span>
		</Button>
	);
};
