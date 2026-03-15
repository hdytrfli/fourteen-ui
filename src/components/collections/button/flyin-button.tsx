import * as React from 'react';
import { gsap } from 'gsap';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import { Button } from '@/components/primitive/button';
import { DURATION, EASE } from '@/libs/constants';

type IconPosition = 'start' | 'end';

interface Props extends React.ComponentProps<typeof Button> {
	label: string;
	icon: LucideIcon;
	position: IconPosition;
}

/**
 * Button with a label and a Lucide icon that slides in from its natural side on hover,
 * expanding the button padding to make room without shifting the label.
 * @param label - Visible button text
 * @param icon - Lucide icon component
 * @param position - Whether the icon sits at the 'start' or 'end'
 */
export const FlyinButton = ({ label, icon: Icon, position, className, ...rest }: Props) => {
	const ref = React.useRef<HTMLButtonElement>(null);
	const icon = React.useRef<HTMLSpanElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const from = position === 'start' ? -16 : 16;
		const padding = position === 'start' ? 'paddingLeft' : 'paddingRight';

		gsap.set(icon.current, { x: from, opacity: 0 });

		const tl = gsap.timeline({
			paused: true,
			defaults: { duration: DURATION.base, ease: EASE.inOut },
		});

		tl.to(el, { [padding]: 40 }).to(icon.current, { x: 0, opacity: 1 }, 0);

		const play = () => tl.play();
		const reverse = () => tl.reverse();

		el.addEventListener('mouseenter', play);
		el.addEventListener('mouseleave', reverse);

		return () => {
			el.removeEventListener('mouseenter', play);
			el.removeEventListener('mouseleave', reverse);
			tl.kill();
		};
	}, [position]);

	return (
		<Button ref={ref} aria-label={label} className={className} {...rest}>
			<span className='flex items-center pointer-events-none select-none'>
				<span>{label}</span>
			</span>
			<span
				ref={icon}
				aria-hidden
				className={cn('absolute top-1/2 -translate-y-1/2', {
					'left-4': position === 'start',
					'right-4': position === 'end',
				})}>
				<Icon size={16} />
			</span>
		</Button>
	);
};
