import * as React from 'react';

interface ContextValue {
	open: boolean;
	close: () => void;
	content: React.RefObject<HTMLDivElement | null>;
}

export const ModalContext = React.createContext<ContextValue | null>(null);

/**
 * Exposes the nearest Modal context to a child component.
 * Throws if used outside a Modal wrapper.
 */
export const useModal = (): ContextValue => {
	const ctx = React.useContext(ModalContext);
	if (!ctx) throw new Error('useModal must be used inside a Modal');
	return ctx;
};
