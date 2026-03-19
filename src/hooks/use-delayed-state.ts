import * as React from 'react';

/**
 * Hook that delays a state update by a specified time.
 * @param initial - Initial state value
 * @param delay - Delay in milliseconds
 */
export function useDelayedState<T>(
	initial: T,
	delay: number
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [state, _setState] = React.useState(initial);
	const timer = React.useRef<number | null>(null);

	const setState = React.useCallback(
		(value: React.SetStateAction<T>) => {
			if (timer.current) window.clearTimeout(timer.current);
			timer.current = window.setTimeout(() => {
				_setState(value);
			}, delay);
		},
		[delay]
	);

	React.useEffect(() => {
		return () => {
			if (timer.current) window.clearTimeout(timer.current);
		};
	}, []);

	return [state, setState];
}
