import * as React from 'react';

/**
 * Hook to track scroll progress of the window.
 * @returns progress - A number between 0 and 1
 */
export function useScrollProgress(): number {
	const [progress, setProgress] = React.useState(0);
	const previous = React.useRef(0);

	React.useEffect(() => {
		const update = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
			const max = scrollHeight - clientHeight;
			const next = max > 0 ? scrollTop / max : 0;

			if (next !== previous.current) {
				previous.current = next;
				setProgress(next);
			}
		};

		window.addEventListener('scroll', update, { passive: true });
		update();

		return () => window.removeEventListener('scroll', update);
	}, []);

	return progress;
}
