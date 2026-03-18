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

const positions = {
	start: 'flex-row-reverse',
	end: 'flex-row',
} as const;

const SCRAMBLE_CHARS = CHARS.flat().join('');

gsap.registerPlugin(ScrambleTextPlugin);

/**
 * Button that scrambles its label through random characters before resolving on hover.
 * @param label - Visible button text and final resolved value
 * @param icon - Optional Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end' (default: 'start')
 */
export const ScrambleButton = ({
	label,
	icon: Icon,
	position = 'start',
	className,
	...rest
}: Props) => {
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const textRef = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const button = buttonRef.current;
		const textElement = textRef.current;
		if (!button || !textElement) return;

		const animate = () => {
			gsap.to(textElement, {
				scrambleText: {
					text: label,
					chars: SCRAMBLE_CHARS,
					speed: 0.3,
				},
				duration: DURATION.base,
				ease: EASE.default,
			});
		};

		button.addEventListener('mouseenter', animate);

		return () => {
			button.removeEventListener('mouseenter', animate);
		};
	}, [label]);

	return (
		<Button ref={buttonRef} aria-label={label} className={className} {...rest}>
			<span
				className={cn(
					'flex-none',
					'flex items-center gap-2',
					'pointer-events-none select-none',
					positions[position]
				)}>
				<span ref={textRef}>{label}</span>
				{Icon && (
					<span aria-hidden className='flex items-center'>
						<Icon size={16} />
					</span>
				)}
			</span>
		</Button>
	);
};
