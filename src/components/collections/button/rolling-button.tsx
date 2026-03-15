import * as React from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

import { Button } from '@/components/primitive/button';
import { DURATION, EASE, STAGGER } from '@/libs/constants';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	hover: string;
}

/**
 * Button with a staggered character roll on hover.
 * Width is driven by whichever label is naturally wider in the current font.
 * @param label - Text shown by default
 * @param replace - Text that rolls in on hover
 */
export const RollingButton = ({ label, hover, className, ...rest }: Props) => {
	const ref = React.useRef<HTMLButtonElement>(null);
	const text = React.useRef<HTMLSpanElement>(null);
	const next = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const initial = SplitText.create(text.current, { type: 'words, chars' });
		const replaced = SplitText.create(next.current, { type: 'words, chars' });
		gsap.set(replaced.chars, { yPercent: 100 });

		const tl = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.base, ease: EASE.inOut },
		});

		tl.to(initial.chars, {
			yPercent: -100,
			stagger: STAGGER.tight,
		}).to(
			replaced.chars,
			{
				yPercent: 0,
				stagger: STAGGER.tight,
			},
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
	}, [ref]);

	return (
		<Button ref={ref} aria-label={label} className={className} {...rest}>
			<span className='relative flex overflow-hidden pointer-events-none select-none'>
				<span aria-hidden className='invisible px-1'>
					{label.length >= hover.length ? label : hover}
				</span>
				<span ref={text} className='initial absolute inset-0'>
					{label}
				</span>
				<span aria-hidden ref={next} className='replace absolute inset-0'>
					{hover}
				</span>
			</span>
		</Button>
	);
};
