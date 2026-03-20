import * as React from 'react';

export const APPLICATION = {
	toc: true,
	theme: true,
	position: false,
	scrolltop: true,
};

export type Config = typeof APPLICATION;

interface ConfigContextProps {
	config: Config;
	toggle: (key: keyof Config) => void;
}

export const ConfigContext = React.createContext<ConfigContextProps>({
	config: APPLICATION,
	toggle: () => null,
});

export const useConfig = () => {
	const context = React.useContext(ConfigContext);
	if (context === undefined) throw new Error('useConfig must be used within a ConfigProvider');
	return context;
};
