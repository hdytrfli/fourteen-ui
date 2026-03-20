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
}

const positions = {
	start: 'flex-row-reverse',
	end: 'flex-row',
} as const;

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
	const animating = React.useRef(false);
	const text = React.useRef<HTMLSpanElement>(null);
	const icon = React.useRef<HTMLSpanElement>(null);
	const button = React.useRef<HTMLButtonElement>(null);

	React.useLayoutEffect(() => {
		const textElement = text.current;
		const iconElement = icon.current;
		const buttonElement = button.current;
		if (!buttonElement || !textElement) return;

		const split = SplitText.create(textElement, { type: 'words, chars' });

		gsap.set(split.chars, { y: VALUES.zero });
		if (iconElement) gsap.set(iconElement, { y: VALUES.zero });

		const animate = () => {
			if (animating.current) return;
			animating.current = true;

			const OFFSET = -6;
			const LENGTH = split.chars.length;
			const DELAY = position === 'start' ? VALUES.zero : LENGTH * STAGGER.base;

			const timeline = gsap.timeline({
				defaults: { ease: EASE.default, duration: DURATION.base },
				onComplete: () => {
					animating.current = false;
					gsap.set(split.chars, { y: VALUES.zero });
					if (iconElement) gsap.set(iconElement, { y: VALUES.zero });
				},
			});

			if (iconElement) {
				timeline
					.to(iconElement, { y: OFFSET, delay: DELAY }, 0)
					.to(iconElement, { y: VALUES.zero, delay: DELAY }, DURATION.base);
			}

			timeline
				.to(split.chars, { y: OFFSET, stagger: STAGGER.base }, 0)
				.to(split.chars, { y: VALUES.zero, stagger: STAGGER.base }, DURATION.base);
		};

		buttonElement.addEventListener('mouseenter', animate);

		return () => {
			buttonElement.removeEventListener('mouseenter', animate);
			split.revert();
		};
	}, [position]);

	return (
		<Button ref={button} aria-label={label} className={cn('overflow-visible', className)} {...rest}>
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
