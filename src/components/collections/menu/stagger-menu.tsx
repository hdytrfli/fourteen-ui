import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE, STAGGER, VALUES } from '@/libs/constants';
import { MenuItem } from '@/components/primitive/menu-item';

interface Props extends React.ComponentProps<typeof MenuItem> {
	//
}

/**
 * Menu item with stagger animation on submenu expand.
 */
export const StaggerMenuItem = ({ children, ...rest }: Props) => {
	const submenu = React.Children.count(children) > 0;
	const submenuRef = React.useRef<HTMLUListElement>(null);

	const handleExpand = React.useCallback(
		(open: boolean) => {
			const container = submenuRef.current;
			if (!container || !submenu) return;

			const items = Array.from(container.querySelectorAll(':scope > li > button')) as HTMLElement[];

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
		},
		[submenu]
	);

	return (
		<MenuItem submenuRef={submenuRef} onExpand={handleExpand} {...rest}>
			{children}
		</MenuItem>
	);
};
