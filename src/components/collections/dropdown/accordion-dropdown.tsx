import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, STAGGER } from '@/libs/constants';
import { DropdownContent } from '@/components/primitive/dropdown-content';
import { useDropdown } from '@/hooks/use-dropdown';

interface Props extends React.ComponentProps<typeof DropdownContent> {
	children: React.ReactNode;
}

/**
 * Dropdown variant where items expand vertically one after another.
 * @param children - DropdownItem components
 */
export const AccordionDropdown = ({ children, className, ...rest }: Props) => {
	const { open } = useDropdown();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const items = Array.from(el.children) as HTMLElement[];

		if (open) {
			gsap.fromTo(
				items,
				{ height: 0, opacity: 0 },
				{
					height: 'auto',
					opacity: 1,
					ease: 'power2.out',
					stagger: STAGGER.base,
					duration: DURATION.slow,
				}
			);
		}

		if (!open) {
			gsap.to(items, {
				height: 0,
				opacity: 0,
				ease: 'power2.in',
				stagger: STAGGER.base,
				duration: DURATION.slow,
			});
		}
	}, [open]);

	return (
		<DropdownContent className={cn(className)} {...rest}>
			<div ref={ref} className='overflow-hidden'>
				{children}
			</div>
		</DropdownContent>
	);
};
