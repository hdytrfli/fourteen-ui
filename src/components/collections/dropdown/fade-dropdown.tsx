import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DISTANCE_DROPDOWN, DURATION, EASE, VALUES } from '@/libs/constants';
import { DropdownContent } from '@/components/primitive/dropdown-content';
import { useDropdown } from '@/hooks/use-dropdown';

interface Props extends React.ComponentProps<typeof DropdownContent> {
	children: React.ReactNode;
}

/**
 * Dropdown variant that fades and slides in on open.
 * @param children - DropdownItem components
 */
export const FadeDropdown = ({ children, className, ...rest }: Props) => {
	const { open } = useDropdown();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;

		const states = {
			open: { opacity: VALUES.visible, y: VALUES.zero, ease: EASE.default },
			closed: { opacity: VALUES.hidden, y: DISTANCE_DROPDOWN, ease: EASE.default },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(element, {
			...states[state],
			duration: DURATION.base,
		});
	}, [open]);

	return (
		<DropdownContent className={cn(className)} {...rest}>
			<div ref={ref} className='opacity-0'>
				{children}
			</div>
		</DropdownContent>
	);
};
