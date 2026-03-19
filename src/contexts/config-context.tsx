import type { Config, Navigation } from '@/libs/types';
import * as React from 'react';

interface ConfigContextProps {
	config: Config;
	toggle: (navigation: Navigation) => void;
}

export const ConfigContext = React.createContext<ConfigContextProps>({
	config: {
		toc: true,
		theme: true,
		scrolltop: true,
	},
	toggle: () => null,
});

export const useConfig = () => {
	const context = React.useContext(ConfigContext);
	if (context === undefined) throw new Error('useConfig must be used within a ConfigProvider');
	return context;
};
