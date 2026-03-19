import * as React from 'react';
import { ConfigContext } from '@/contexts/config-context';
import type { Config } from '@/libs/types';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface ConfigProviderProps {
	children: React.ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
	const [config, setConfig] = useLocalStorage<Config>('config', {
		toc: true,
		theme: true,
		scrolltop: false,
	});

	const toggle = (navigation: keyof Config) => {
		setConfig((prev) => {
			const next = { ...prev };
			next[navigation] = !next[navigation];
			return next;
		});
	};

	return <ConfigContext.Provider value={{ config, toggle }}>{children}</ConfigContext.Provider>;
};
