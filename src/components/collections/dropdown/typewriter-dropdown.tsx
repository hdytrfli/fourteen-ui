import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE, STAGGER } from '@/libs/constants';
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
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;

		const items = Array.from(element.children) as HTMLElement[];
		if (!items.length) return;

		gsap.set(items, {
			xPercent: -100,
			opacity: 0,
		});

		if (open) {
			gsap.to(items, {
				xPercent: 0,
				opacity: 1,
				ease: EASE.default,
				stagger: STAGGER.base,
				duration: DURATION.base,
			});
		}

		if (!open) {
			gsap.to(items, {
				xPercent: -100,
				opacity: 0,
				ease: EASE.default,
				stagger: STAGGER.base,
				duration: DURATION.base,
			});
		}

		return () => {
			gsap.killTweensOf(items);
		};
	}, [open]);

	return (
		<DropdownContent className={cn(className)} {...rest}>
			<div ref={ref} className='overflow-hidden'>
				{children}
			</div>
		</DropdownContent>
	);
};
