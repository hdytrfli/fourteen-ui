import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { MenuItem } from '@/components/primitive/menu-item';

/**
 * Menu item with slide animation on submenu expand.
 */
export const SlideMenuItem = ({ children, ...rest }: React.ComponentProps<typeof MenuItem>) => {
	const menu = React.useRef<HTMLUListElement>(null);
	const [open, setOpen] = React.useState(false);

	React.useLayoutEffect(() => {
		const element = menu.current;
		if (!element) return;

		const states = {
			open: { x: 0, opacity: VALUES.visible, ease: EASE.default },
			closed: { x: -10, opacity: VALUES.hidden, ease: EASE.default },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(element, {
			...states[state],
			duration: DURATION.base,
		});
	}, [open]);

	return (
		<MenuItem submenuRef={menu} onOpenChange={setOpen} {...rest}>
			{children}
		</MenuItem>
	);
};
