import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE, STAGGER, VALUES } from '@/libs/constants';
import { DropdownContent } from '@/components/primitive/dropdown-content';
import { useDropdown } from '@/hooks/use-dropdown';

interface Props extends React.ComponentProps<typeof DropdownContent> {
	children: React.ReactNode;
}

/**
 * Dropdown variant where items reveal one-by-one like typewriter effect.
 * Each item slides in sequentially from left with linear easing.
 * @param children - DropdownItem components
 */
export const TypewriterDropdown = ({ children, className, ...rest }: Props) => {
	const { open } = useDropdown();
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const items = Array.from(container.children) as HTMLElement[];
		if (!items.length) return;

		const states = {
			open: { xPercent: VALUES.zero, opacity: VALUES.visible, ease: EASE.default },
			closed: { xPercent: -20, opacity: VALUES.hidden, ease: EASE.default },
		} as const;

		if (open) {
			gsap.fromTo(items, states.closed, {
				...states.open,
				stagger: STAGGER.base,
				duration: DURATION.base,
			});
		} else {
			gsap.to(items, {
				...states.closed,
				stagger: STAGGER.base,
				duration: DURATION.base,
			});
		}

		return () => gsap.killTweensOf(items);
	}, [open]);

	return (
		<DropdownContent className={cn(className)} {...rest}>
			<div ref={contentRef} className='overflow-hidden'>
				{children}
			</div>
		</DropdownContent>
	);
};
