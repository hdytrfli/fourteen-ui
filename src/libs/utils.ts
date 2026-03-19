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
	anchor: DOMRect;
	placement: Placement;
	element: HTMLDivElement;
}

/**
 * Calculate absolute position for an element relative to an anchor.
 * @param element - The element to position
 * @param gap - Space between anchor and target in pixels
 * @param anchor - The reference element's bounding rect
 * @param size - The element to position's bounding rect
 * @param placement - Where to position the target relative to anchor
 */
export const setPosition = ({ anchor, element, gap = 0, placement }: getPositionProps): void => {
	const size = {
		width: element.offsetWidth,
		height: element.offsetHeight,
	};

	const x = {
		left: anchor.left,
		right: anchor.right - size.width,
		center: anchor.left + (anchor.width - size.width) / 2,
	};

	const y = {
		top: anchor.top,
		bottom: anchor.bottom,
		center: anchor.top + (anchor.height - size.height) / 2,
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
		'left-bottom': { top: y.bottom, left: x.left - size.width },
		'right-top': { top: y.top, left: anchor.right },
		'right-center': { top: y.center, left: anchor.right },
		'right-bottom': { top: y.bottom, left: anchor.right },
	};

	const { top, left } = positions[placement];
	const horizontal = placement.startsWith('left') || placement.startsWith('right');

	Object.assign(element.style, {
		position: 'absolute',
		top: top + window.scrollY + 'px',
		left: left + window.scrollX + 'px',
		paddingBlock: horizontal ? 0 : gap + 'px',
		paddingInline: horizontal ? gap + 'px' : 0,
	});
};
