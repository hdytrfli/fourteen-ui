import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE, STAGGER, VALUES } from '@/libs/constants';
import { DropdownContent } from '@/components/primitive/dropdown';
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
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const items = Array.from(container.children) as HTMLElement[];

		const states = {
			open: { height: 'auto', opacity: VALUES.visible, ease: EASE.default },
			closed: { height: 0, opacity: VALUES.hidden, ease: EASE.default },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.fromTo(items, states.closed, {
			...states[state],
			stagger: STAGGER.base,
			duration: DURATION.base,
		});

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
