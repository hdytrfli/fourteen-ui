import * as React from 'react';

/**
 * Hook to persist a value in localStorage.
 * @param key - Key to store the value under
 * @param initial - Initial value to set
 */
export function useLocalStorage<T>(key: string, initial: T) {
	const [value, setValue] = React.useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initial;
		} catch {
			return initial;
		}
	});

	const set = React.useCallback(
		(next: T | ((prev: T) => T)) => {
			setValue((prev) => {
				const resolved = typeof next === 'function' ? (next as (prev: T) => T)(prev) : next;
				try {
					localStorage.setItem(key, JSON.stringify(resolved));
				} catch {
					//
				}
				return resolved;
			});
		},
		[key]
	);

	const remove = React.useCallback(() => {
		localStorage.removeItem(key);
		setValue(initial);
	}, [key, initial]);

	return [value, set, remove] as const;
}
