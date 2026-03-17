import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, STAGGER, VALUES } from '@/libs/constants';
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
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const states = {
			open: { opacity: VALUES.visible, filter: 'blur(0px)' },
			closed: { opacity: VALUES.hidden, filter: 'blur(4px)' },
		} as const;

		if (open) {
			gsap.fromTo(container.children, states.closed, {
				...states.open,
				stagger: STAGGER.base,
				duration: DURATION.base,
			});
		} else {
			gsap.to(container.children, {
				...states.closed,
				stagger: STAGGER.base,
				duration: DURATION.base,
			});
		}

		return () => gsap.killTweensOf(container.children);
	}, [open]);

	return (
		<DropdownContent className={cn(className)} {...rest}>
			<div ref={contentRef}>{children}</div>
		</DropdownContent>
	);
};
