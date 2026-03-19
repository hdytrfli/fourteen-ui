import * as React from 'react';

interface ContextValue {
	open: boolean;
	trigger: React.RefObject<HTMLDivElement | null>;
	content: React.RefObject<HTMLDivElement | null>;
}

export const TooltipContext = React.createContext<ContextValue | null>(null);

/**
 * Exposes the nearest Tooltip context to a child component.
 * Throws if used outside a Tooltip wrapper.
 */
export const useTooltip = (): ContextValue => {
	const ctx = React.useContext(TooltipContext);
	if (!ctx) throw new Error('useTooltip must be used inside a Tooltip');
	return ctx;
};
