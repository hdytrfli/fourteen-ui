import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { MenuItem } from '@/components/primitive/menu-item';

interface Props extends React.ComponentProps<typeof MenuItem> {
	//
}

/**
 * Menu item with fade animation on submenu expand.
 */
export const FadeMenuItem = ({ children, ...rest }: Props) => {
	const submenu = React.Children.count(children) > 0;
	const submenuRef = React.useRef<HTMLUListElement>(null);

	const handleExpand = React.useCallback(
		(open: boolean) => {
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
		},
		[submenu]
	);

	return (
		<MenuItem submenuRef={submenuRef} onExpand={handleExpand} {...rest}>
			{children}
		</MenuItem>
	);
};
