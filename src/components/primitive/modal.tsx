import * as React from 'react';
import { ModalContext } from '@/hooks/use-modal';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface Props {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

/**
 * Modal root that manages open state, scroll lock, and focus trapping.
 * @param open - Controls whether the modal is visible
 * @param onClose - Callback fired when the modal should close
 */
export const Modal = ({ open, onClose, children }: Props) => {
	const content = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const root = document.documentElement;

		if (open) root.classList.add('overflow-hidden');
		else root.classList.remove('overflow-hidden');

		return () => root.classList.remove('overflow-hidden');
	}, [open]);

	useFocusTrap(content, open, onClose);

	return (
		<ModalContext.Provider value={{ open, close: onClose, content }}>
			{children}
		</ModalContext.Provider>
	);
};
