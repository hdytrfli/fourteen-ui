import * as React from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { APPLICATION, ConfigContext, type Config } from '@/contexts/config-context';

interface ConfigProviderProps {
	children: React.ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
	const [config, setConfig] = useLocalStorage<Config>('config', APPLICATION);

	const toggle = (key: keyof Config) => {
		setConfig((prev) => {
			const next = { ...prev };
			next[key] = !next[key];
			return next;
		});
	};

	return <ConfigContext.Provider value={{ config, toggle }}>{children}</ConfigContext.Provider>;
};
