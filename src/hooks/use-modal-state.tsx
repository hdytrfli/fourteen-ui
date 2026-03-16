import * as React from 'react';

interface ModalState {
	open: boolean;
	onOpen: () => void;
	onClose: () => void;
}

/**
 * Manages open/close state for a single modal instance.
 */
export const useModalState = (): ModalState => {
	const [open, setOpen] = React.useState(false);
	return {
		open,
		onOpen: () => setOpen(true),
		onClose: () => setOpen(false),
	};
};
