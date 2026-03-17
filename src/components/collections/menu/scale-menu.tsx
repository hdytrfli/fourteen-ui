import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE } from '@/libs/constants';
import { MenuItem } from '@/components/primitive/menu-item';

interface Props extends React.ComponentProps<typeof MenuItem> {
	//
}

/**
 * Menu item with scale animation on submenu expand.
 * Combines height animation with scale effect.
 */
export const ScaleMenuItem = ({ children, ...rest }: Props) => {
	const [open, setOpen] = React.useState(false);
	const submenu = React.Children.count(children) > 0;
	const submenuRef = React.useRef<HTMLUListElement>(null);

	React.useLayoutEffect(() => {
		const container = submenuRef.current;
		if (!container || !submenu) return;

		const states = {
			open: { scale: 1, ease: EASE.default },
			closed: { scale: 0.95, ease: EASE.default },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(container, {
			...states[state],
			duration: DURATION.base,
		});
	}, [open, submenu]);

	return (
		<MenuItem submenuRef={submenuRef} onClick={() => submenu && setOpen((prev) => !prev)} {...rest}>
			{children}
		</MenuItem>
	);
};
