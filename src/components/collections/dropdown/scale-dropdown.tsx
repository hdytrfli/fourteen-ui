import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE, VALUES } from '@/libs/constants';
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
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const states = {
			open: {
				scale: VALUES.one,
				opacity: VALUES.visible,
				transformOrigin: 'top center',
				ease: EASE.default,
			},
			closed: {
				scale: 0.9,
				opacity: VALUES.hidden,
				transformOrigin: 'top center',
				ease: EASE.default,
			},
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(container, {
			...states[state],
			duration: DURATION.base,
		});

		return () => gsap.killTweensOf(container);
	}, [open]);

	return (
		<DropdownContent className={cn(className)} {...rest}>
			<div ref={contentRef} className='opacity-0 scale-[0.9]'>
				{children}
			</div>
		</DropdownContent>
	);
};
