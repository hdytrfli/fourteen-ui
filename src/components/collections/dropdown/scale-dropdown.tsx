import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE } from '@/libs/constants';
import { DropdownContent } from '@/components/primitive/dropdown-content';
import { useDropdown } from '@/hooks/use-dropdown';

interface Props extends React.ComponentProps<typeof DropdownContent> {
	children: React.ReactNode;
}

/**
 * Dropdown variant that scales up from center on open.
 * @param children - DropdownItem components
 */
export const ScaleDropdown = ({ children, className, ...rest }: Props) => {
	const { open } = useDropdown();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const variants = {
			open: {
				scale: 1,
				opacity: 1,
				transformOrigin: 'top center',
				ease: EASE.out,
			},
			closed: {
				scale: 0.9,
				opacity: 0,
				transformOrigin: 'top center',
				ease: EASE.in,
			},
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.set(el, { scale: 0.9, opacity: 0 });
		gsap.to(el, {
			...variants[state],
			duration: DURATION.base,
		});
	}, [open]);

	return (
		<DropdownContent className={cn(className)} {...rest}>
			<div ref={ref} className='opacity-0 scale-[0.9]'>
				{children}
			</div>
		</DropdownContent>
	);
};
