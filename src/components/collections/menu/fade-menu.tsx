import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { MenuItem } from '@/components/primitive/menu-item';

/**
 * Menu item with fade animation on submenu expand.
 */
export const FadeMenuItem = ({ children, ...rest }: React.ComponentProps<typeof MenuItem>) => {
	const ref = React.useRef<HTMLUListElement>(null);
	const [open, setOpen] = React.useState(false);

	React.useLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;

		const states = {
			open: { opacity: VALUES.visible, ease: EASE.default },
			closed: { opacity: VALUES.hidden, ease: EASE.default },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(element, {
			...states[state],
			duration: DURATION.base,
		});
	}, [open]);

	return (
		<MenuItem submenuRef={ref} onOpenChange={setOpen} {...rest}>
			{children}
		</MenuItem>
	);
};
