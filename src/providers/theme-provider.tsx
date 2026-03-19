import * as React from 'react';

import type { Theme } from '@/libs/types';
import { THEMES } from '@/libs/constants';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ThemeProviderContext } from '@/contexts/theme-context';

interface ThemeProviderProps {
	children: React.ReactNode;
}

/**
 * Theme provider that manages light/dark/system theme preference.
 * Persists to localStorage and respects system preference via prefers-color-scheme.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');

	React.useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');

		if (theme === 'system') {
			const media = window.matchMedia('(prefers-color-scheme: dark)');
			const system = media.matches ? 'dark' : 'light';
			root.classList.add(system);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const current = THEMES.findIndex((item) => item.value === theme);

	const rotate = () => {
		const next = THEMES[(current + 1) % THEMES.length];
		setTheme(next.value);
	};

	return (
		<ThemeProviderContext.Provider
			value={{
				rotate,
				setTheme,
				theme: theme,
				icon: THEMES[current].icon,
			}}>
			{children}
		</ThemeProviderContext.Provider>
	);
};
