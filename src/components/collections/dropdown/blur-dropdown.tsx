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
 * Dropdown variant that blurs and fades in on open.
 * @param children - DropdownItem components
 */
export const BlurDropdown = ({ children, className, ...rest }: Props) => {
	const { open } = useDropdown();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const variants = {
			open: { opacity: 1, y: 0, filter: 'blur(0px)', ease: EASE.out },
			closed: { opacity: 0, y: 1, filter: 'blur(8px)', ease: EASE.in },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(el, {
			...variants[state],
			duration: DURATION.slow,
		});
	}, [open]);

	return (
		<DropdownContent className={cn(className)} {...rest}>
			<div ref={ref} className='opacity-0 blur-sm'>
				{children}
			</div>
		</DropdownContent>
	);
};
