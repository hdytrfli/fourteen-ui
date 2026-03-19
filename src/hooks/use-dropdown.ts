import * as React from 'react';

interface ContextValue {
	open: boolean;
	toggle: () => void;
	trigger: React.RefObject<HTMLDivElement | null>;
	content: React.RefObject<HTMLDivElement | null>;
}

export const DropdownContext = React.createContext<ContextValue | null>(null);

/**
 * Exposes the nearest Dropdown context to a child component.
 * Throws if used outside a Dropdown wrapper.
 */
export const useDropdown = (): ContextValue => {
	const ctx = React.useContext(DropdownContext);
	if (!ctx) throw new Error('useDropdown must be used inside a Dropdown');
	return ctx;
};
