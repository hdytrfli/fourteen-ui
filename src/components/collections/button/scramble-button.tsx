import * as React from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { Button } from '@/components/primitive/button';
import { DURATION, EASE, SCRAMBLE_CHARS } from '@/libs/constants';

gsap.registerPlugin(ScrambleTextPlugin);

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
}

/**
 * Button that scrambles its label through random characters before resolving on hover.
 * @param label - Visible button text and final resolved value
 */
export const ScrambleButton = ({ label, className, ...rest }: Props) => {
	const ref = React.useRef<HTMLButtonElement>(null);
	const text = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const tl = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.slow, ease: EASE.inOut },
		});

		tl.to(text.current, {
			scrambleText: {
				text: label,
				chars: SCRAMBLE_CHARS,
				speed: 0.3,
			},
		});

		const play = () => tl.restart();
		const reverse = () => tl.reverse();

		el.addEventListener('mouseenter', play);
		el.addEventListener('mouseleave', reverse);

		return () => {
			el.removeEventListener('mouseenter', play);
			el.removeEventListener('mouseleave', reverse);
			tl.kill();
		};
	}, [label]);

	return (
		<Button ref={ref} aria-label={label} className={className} {...rest}>
			<span className='pointer-events-none select-none'>
				<span ref={text}>{label}</span>
			</span>
		</Button>
	);
};
