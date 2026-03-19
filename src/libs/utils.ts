import clsx, { type ClassValue } from 'clsx';
import { twMerge as merge } from 'tailwind-merge';
import type { Placement, Position } from '@/libs/types';

/**
 * Utility to merge tailwind classes with ease.
 */
export const cn = (...inputs: ClassValue[]) => {
	return merge(clsx(inputs));
};

interface getPositionProps {
	gap?: number;
	anchor: HTMLDivElement;
	element: HTMLDivElement;
	placement: Placement;
}

/**
 * Calculate absolute position for an element relative to an target.
 * @param element - The element to position
 * @param gap - Space between anchor and target in pixels
 * @param anchor - The reference element's bounding rect
 * @param size - The element to position's bounding rect
 * @param placement - Where to position the target relative to anchor
 */
export const setPosition = ({ anchor, element, gap = 0, placement }: getPositionProps): void => {
	const target = anchor.getBoundingClientRect();

	const size = {
		width: element.offsetWidth,
		height: element.offsetHeight,
	};

	const x = {
		left: target.left,
		right: target.right - size.width,
		center: target.left + (target.width - size.width) / 2,
	};

	const y = {
		top: target.top,
		bottom: target.bottom,
		center: target.top + (target.height - size.height) / 2,
	};

	const positions: Record<Placement, Position> = {
		'top-left': { top: y.top - size.height, left: x.left },
		'top-center': { top: y.top - size.height, left: x.center },
		'top-right': { top: y.top - size.height, left: x.right },
		'bottom-left': { top: y.bottom, left: x.left },
		'bottom-center': { top: y.bottom, left: x.center },
		'bottom-right': { top: y.bottom, left: x.right },
		'left-top': { top: y.top, left: x.left - size.width },
		'left-center': { top: y.center, left: x.left - size.width },
		'left-bottom': { top: y.bottom - size.height, left: x.left - size.width },
		'right-top': { top: y.top, left: target.right },
		'right-center': { top: y.center, left: target.right },
		'right-bottom': { top: y.bottom - size.height, left: target.right },
	};

	const { top, left } = positions[placement];

	Object.assign(element.style, {
		position: 'absolute',
		top: top + window.scrollY + 'px',
		left: left + window.scrollX + 'px',
		marginTop: placement.startsWith('top') && -gap + 'px',
		marginLeft: placement.startsWith('left') && -gap + 'px',
		paddingLeft: placement.startsWith('right') && gap + 'px',
		paddingRight: placement.startsWith('left') && gap + 'px',
		paddingBottom: placement.startsWith('top') && gap + 'px',
		paddingTop: placement.startsWith('bottom') && gap + 'px',
	} as React.CSSProperties);
};
