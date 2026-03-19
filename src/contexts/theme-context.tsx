import * as React from 'react';
import type { Theme } from '@/libs/types';
import { Eclipse, type LucideIcon } from 'lucide-react';

interface ThemeProviderState {
	theme: Theme;
	icon: LucideIcon;
	rotate: () => void;
	setTheme: (theme: Theme) => void;
}

export const ThemeProviderContext = React.createContext<ThemeProviderState>({
	icon: Eclipse,
	theme: 'system',
	rotate: () => null,
	setTheme: () => null,
});

export const useTheme = () => {
	const context = React.useContext(ThemeProviderContext);
	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
	return context;
};
