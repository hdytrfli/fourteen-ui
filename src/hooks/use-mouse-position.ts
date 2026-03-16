import * as React from 'react';

interface Position {
	x: number;
	y: number;
}

/**
 * Tracks mouse position relative to the viewport.
 */
export const useMousePosition = (): Position => {
	const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });

	React.useLayoutEffect(() => {
		const update = (e: MouseEvent) => {
			setPosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('mousemove', update);
		return () => window.removeEventListener('mousemove', update);
	}, []);

	return position;
};
