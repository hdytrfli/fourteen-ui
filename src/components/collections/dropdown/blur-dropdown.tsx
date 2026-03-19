import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';

import { useDropdown } from '@/hooks/use-dropdown';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { DropdownContent } from '@/components/primitive/dropdown';

interface Props extends React.ComponentProps<typeof DropdownContent> {
	children: React.ReactNode;
}

/**
 * Dropdown variant that blurs and fades in on open.
 * @param children - DropdownItem components
 */
export const BlurDropdown = ({ children, className, ...rest }: Props) => {
	const { open } = useDropdown();
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const states = {
			open: { opacity: VALUES.visible, y: VALUES.zero, filter: 'blur(0px)', ease: EASE.default },
			closed: { opacity: VALUES.hidden, y: VALUES.one, filter: 'blur(8px)', ease: EASE.default },
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
			<div ref={contentRef} className='opacity-0 blur-sm'>
				{children}
			</div>
		</DropdownContent>
	);
};
