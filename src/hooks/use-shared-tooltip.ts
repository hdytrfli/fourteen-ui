import * as React from 'react';

interface ContextValue {
	register: (id: string, label: string) => void;
	unregister: (id: string) => void;
	show: (id: string) => void;
	hide: () => void;
}

export const TooltipContext = React.createContext<ContextValue | null>(null);

/**
 * Exposes the shared tooltip context to trigger components.
 * Throws if used outside a SharedTooltipProvider wrapper.
 */
export const useSharedTooltip = (): ContextValue => {
	const ctx = React.useContext(TooltipContext);
	if (!ctx) throw new Error('useSharedTooltip must be used inside SharedTooltipProvider');
	return ctx;
};
