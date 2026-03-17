import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { MenuItem } from '@/components/primitive/menu-item';

interface Props extends React.ComponentProps<typeof MenuItem> {
	//
}

/**
 * Menu item with fade animation on submenu expand.
 * Combines height animation with fade effect.
 */
export const FadeMenuItem = ({ children, ...rest }: Props) => {
	const [open, setOpen] = React.useState(false);
	const submenu = React.Children.count(children) > 0;
	const submenuRef = React.useRef<HTMLUListElement>(null);

	React.useLayoutEffect(() => {
		const container = submenuRef.current;
		if (!container || !submenu) return;

		const states = {
			open: { opacity: VALUES.visible, ease: EASE.default },
			closed: { opacity: VALUES.hidden, ease: EASE.default },
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
