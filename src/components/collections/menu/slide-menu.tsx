import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE } from '@/libs/constants';
import { MenuItem } from '@/components/primitive/menu-item';

interface Props extends React.ComponentProps<typeof MenuItem> {
	//
}

/**
 * Menu item with slide animation on submenu expand.
 */
export const SlideMenuItem = ({ children, ...rest }: Props) => {
	const submenu = React.Children.count(children) > 0;
	const submenuRef = React.useRef<HTMLUListElement>(null);

	const handleExpand = React.useCallback(
		(open: boolean) => {
			const container = submenuRef.current;
			if (!container || !submenu) return;

			const states = {
				open: { x: 0, ease: EASE.default },
				closed: { x: -10, ease: EASE.default },
			} as const;

			const state = open ? 'open' : 'closed';

			gsap.to(container, {
				...states[state],
				duration: DURATION.base,
			});
		},
		[submenu]
	);

	return (
		<MenuItem submenuRef={submenuRef} onExpand={handleExpand} {...rest}>
			{children}
		</MenuItem>
	);
};
