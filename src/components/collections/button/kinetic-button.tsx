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
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const textRef = React.useRef<HTMLSpanElement>(null);
	const iconRef = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const button = buttonRef.current;
		const textElement = textRef.current;
		const iconElement = iconRef.current;
		if (!button || !textElement) return;

		const split = SplitText.create(textElement, { type: 'words, chars' });
		gsap.set(split.chars, { y: VALUES.zero });
		if (iconElement) gsap.set(iconElement, { y: VALUES.zero });

		const animate = () => {
			const first = position === 'start';
			const delay = first ? VALUES.zero : split.chars.length * STAGGER.base;

			const state = {
				y: JUMP_HEIGHT,
				duration: DURATION.fast,
				ease: EASE.out,
				yoyo: true,
				repeat: 1,
				repeatDelay: 0.1,
			} as const;

			if (iconElement) gsap.to(iconElement, { ...state, delay: delay });
			split.chars.forEach((char, index) => {
				gsap.to(char, {
					...state,
					delay: index * STAGGER.base,
				});
			});
		};

		button.addEventListener('mouseenter', animate);

		return () => {
			button.removeEventListener('mouseenter', animate);
			split.revert();
		};
	}, [position]);

	return (
		<Button
			ref={buttonRef}
			aria-label={label}
			className={cn('overflow-visible', className)}
			{...rest}>
			<span
				className={cn(
					'relative flex items-center gap-2 pointer-events-none select-none',
					Icon && positions[position]
				)}>
				<span ref={textRef} className='flex gap-1'>
					{label}
				</span>
				{Icon && (
					<span ref={iconRef} aria-hidden className='flex items-center'>
						<Icon size={16} />
					</span>
				)}
			</span>
		</Button>
	);
};
