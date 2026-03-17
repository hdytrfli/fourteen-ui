import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE, STAGGER, VALUES } from '@/libs/constants';
import { MenuItem } from '@/components/primitive/menu-item';

interface Props extends React.ComponentProps<typeof MenuItem> {
	//
}

/**
 * Menu item with stagger animation on submenu expand.
 * Combines height animation with staggered item animation.
 */
export const StaggerMenuItem = ({ children, ...rest }: Props) => {
	const [open, setOpen] = React.useState(false);
	const submenu = React.Children.count(children) > 0;
	const submenuRef = React.useRef<HTMLUListElement>(null);

	React.useLayoutEffect(() => {
		const container = submenuRef.current;
		if (!container || !submenu) return;

		const items = Array.from(container.children) as HTMLElement[];

		const states = {
			open: { x: 0, opacity: VALUES.visible, ease: EASE.default },
			closed: { x: -8, opacity: VALUES.hidden, ease: EASE.default },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(items, {
			...states[state],
			stagger: STAGGER.base,
			duration: DURATION.base,
		});
	}, [open, submenu]);

	return (
		<MenuItem submenuRef={submenuRef} onClick={() => submenu && setOpen((prev) => !prev)} {...rest}>
			{children}
		</MenuItem>
	);
};
