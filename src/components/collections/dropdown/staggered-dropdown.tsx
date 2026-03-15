import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE, STAGGER, DISTANCE } from '@/libs/constants';
import { DropdownContent } from '@/components/primitive/dropdown-content';
import { useDropdown } from '@/hooks/use-dropdown';

interface Props extends React.ComponentProps<typeof DropdownContent> {
	children: React.ReactNode;
}

/**
 * Dropdown variant where each item staggers in individually on open.
 * @param children - DropdownItem components
 */
export const StaggeredDropdown = ({ children, className, ...rest }: Props) => {
	const { open } = useDropdown();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		gsap.set(el.children, { opacity: 0, y: DISTANCE });
	}, []);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		if (open) {
			gsap.to(el.children, {
				opacity: 1,
				y: 0,
				ease: EASE.out,
				stagger: STAGGER.base,
				duration: DURATION.slow,
			});
		}

		if (!open) {
			gsap.set(el.children, {
				opacity: 0,
				y: DISTANCE,
			});
		}
	}, [open]);

	return (
		<DropdownContent className={cn(className)} {...rest}>
			<div ref={ref}>{children}</div>
		</DropdownContent>
	);
};
