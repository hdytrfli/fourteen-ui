import * as React from 'react';
import { ModalContext } from '@/hooks/use-modal';

interface Props {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

/**
 * Modal root that manages open state and scroll lock.
 * @param open - Controls whether the modal is visible
 * @param onClose - Callback fired when the modal should close
 */
export const Modal = ({ open, onClose, children }: Props) => {
	const content = React.useRef<HTMLDivElement>(null);
	const previous = React.useRef<HTMLElement | null>(null);

	React.useLayoutEffect(() => {
		const root = document.documentElement;

		if (open) {
			previous.current = document.activeElement as HTMLElement;
			root.classList.add('overflow-hidden');
		} else {
			root.classList.remove('overflow-hidden');
			previous.current?.focus();
			previous.current = null;
		}

		return () => root.classList.remove('overflow-hidden');
	}, [open]);

	return (
		<ModalContext.Provider value={{ open, close: onClose, content }}>
			{children}
		</ModalContext.Provider>
	);
};
