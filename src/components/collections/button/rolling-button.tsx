import * as React from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

import type { RollingDirection } from '@/libs/types';
import { DURATION, EASE, STAGGER } from '@/libs/constants';
import { Button } from '@/components/primitive/button';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	hover: string;
	direction?: RollingDirection;
}

/**
 * Button with a staggered character roll on hover.
 * @param label - Text shown by default
 * @param hover - Text that rolls in on hover
 * @param direction - Rolling direction 'left' or 'right' (default: 'left')
 */
export const RollingButton = ({ label, hover, direction = 'left', className, ...rest }: Props) => {
	const ref = React.useRef<HTMLButtonElement>(null);
	const text = React.useRef<HTMLSpanElement>(null);
	const next = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const initial = SplitText.create(text.current, { type: 'words, chars' });
		const replaced = SplitText.create(next.current, { type: 'words, chars' });
		gsap.set(replaced.chars, { yPercent: 150 });

		const tl = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.base, ease: EASE.inOut },
		});

		tl.to(initial.chars, {
			yPercent: -150,
			reversed: direction === 'left',
			stagger: STAGGER.tight,
		}).to(
			replaced.chars,
			{ yPercent: 0, reversed: direction === 'left', stagger: STAGGER.tight },
			0
		);

		const play = () => tl.play();
		const reverse = () => tl.reverse();

		el.addEventListener('mouseenter', play);
		el.addEventListener('mouseleave', reverse);

		return () => {
			el.removeEventListener('mouseenter', play);
			el.removeEventListener('mouseleave', reverse);
			initial.revert();
			replaced.revert();
			tl.kill();
		};
	}, [ref, direction]);

	return (
		<Button ref={ref} aria-label={label} className={className} {...rest}>
			<span className='pointer-events-none select-none'>
				<span aria-hidden className='invisible px-1'>
					{label.length >= hover.length ? label : hover}
				</span>
				<span
					ref={text}
					className='initial flex gap-1 items-center overflow-hidden justify-center absolute inset-0'>
					{label}
				</span>
				<span
					aria-hidden
					ref={next}
					className='replace flex gap-1 items-center overflow-hidden justify-center absolute inset-0'>
					{hover}
				</span>
			</span>
		</Button>
	);
};
