import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE, STAGGER, VALUES } from '@/libs/constants';
import { MenuItem } from '@/components/primitive/menu-item';

/**
 * Menu item with stagger animation on submenu expand.
 */
export const StaggerMenuItem = ({ children, ...rest }: React.ComponentProps<typeof MenuItem>) => {
	const menu = React.useRef<HTMLUListElement>(null);
	const [open, setOpen] = React.useState(false);

	React.useLayoutEffect(() => {
		const element = menu.current;
		if (!element) return;

		const items = element.querySelectorAll('li');

		const states = {
			open: {
				x: 0,
				ease: EASE.default,
				stagger: STAGGER.base,
				opacity: VALUES.visible,
			},
			closed: {
				x: -8,
				ease: EASE.default,
				stagger: STAGGER.base,
				opacity: VALUES.hidden,
			},
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(items, {
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
