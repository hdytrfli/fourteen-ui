import * as React from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/libs/utils';
import { Button } from '@/components/primitive/button';
import { DURATION, EASE, STAGGER } from '@/libs/constants';
import type { IconPosition } from '@/libs/types';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon?: LucideIcon;
	position?: IconPosition;
}

const variants = {
	position: {
		start: 'flex-row-reverse',
		end: 'flex-row',
	},
} as const;

const JUMP_HEIGHT = -4;

/**
 * Button with kinetic text that bounces on hover.
 * Each letter jumps up with staggered timing and lands back smoothly.
 * Icon joins the bounce after all letters complete their motion.
 * @param label - Visible button text
 * @param icon - Optional Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end' (default: 'end')
 */
export const KineticButton = ({ label, icon: Icon, position = 'end', className, ...rest }: Props) => {
	const ref = React.useRef<HTMLButtonElement>(null);
	const text = React.useRef<HTMLSpanElement>(null);
	const icon = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const split = SplitText.create(text.current, { type: 'chars' });
		gsap.set(split.chars, { y: 0 });

		if (icon.current) gsap.set(icon.current, { y: 0 });

		const tl = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.base, ease: EASE.inOut },
		});

		const first = position === 'start';
		const delay = first ? 0 : split.chars.length * STAGGER.tight;

		if (icon.current) {
			tl.to(
				icon.current,
				{
					y: JUMP_HEIGHT,
					duration: DURATION.base * 0.5,
					ease: EASE.out,
				},
				delay
			);

			tl.to(
				icon.current,
				{
					y: 0,
					duration: DURATION.base * 0.5,
					ease: EASE.in,
				},
				delay + DURATION.base * 0.5
			);
		}

		split.chars.forEach((char, i) => {
			const delay = first ? (i + 1) * STAGGER.tight : i * STAGGER.tight;
			tl.to(
				char,
				{
					y: JUMP_HEIGHT,
					duration: DURATION.base * 0.5,
					ease: EASE.out,
				},
				delay
			);

			tl.to(
				char,
				{
					y: 0,
					duration: DURATION.base * 0.5,
					ease: EASE.in,
				},
				delay + DURATION.base * 0.5
			);
		});

		const play = () => tl.play();
		const reverse = () => tl.reverse();

		el.addEventListener('mouseenter', play);
		el.addEventListener('mouseleave', reverse);

		return () => {
			el.removeEventListener('mouseenter', play);
			el.removeEventListener('mouseleave', reverse);
			split.revert();
			tl.kill();
		};
	}, [position]);

	return (
		<Button ref={ref} aria-label={label} className={cn('overflow-visible', className)} {...rest}>
			<span
				className={cn(
					'relative flex items-center gap-2',
					'pointer-events-none select-none',
					Icon && variants.position[position]
				)}>
				<span ref={text} className='flex'>
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
