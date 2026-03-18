import * as React from 'react';
import { ThemeProviderContext } from '../contexts/theme-context';
import type { Theme } from '../contexts/theme-context';

interface ThemeProviderProps {
	key?: string;
	initial?: Theme;
	children: React.ReactNode;
}

/**
 * Theme provider that manages light/dark/system theme preference.
 * Persists to localStorage and respects system preference via prefers-color-scheme.
 */
export function ThemeProvider({
	children,
	key = 'theme',
	initial = 'system',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = React.useState<Theme>(() => {
		const stored = localStorage.getItem(key) as Theme;
		if (stored) return stored;
		return initial;
	});

	React.useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(key, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}
