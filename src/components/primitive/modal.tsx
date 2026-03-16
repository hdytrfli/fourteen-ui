import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cn } from '@/libs/utils';
import { ModalContext } from '@/hooks/use-modal';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface Props extends React.ComponentProps<'div'> {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

/**
 * Modal root with backdrop that manages open state, scroll lock, focus trap, and outside click.
 * Renders via portal to escape stacking context issues.
 * @param open - Controls whether the modal is visible
 * @param onClose - Callback fired when the modal should close
 * @param children - ModalContent or variant components
 */
export const Modal = ({ open, onClose, children, className, ...rest }: Props) => {
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
			{ReactDOM.createPortal(
				<div
					aria-hidden={!open}
					onClick={onClose}
					className={cn(
						'fixed inset-0 z-50',
						'flex items-center justify-center',
						'bg-zinc-950/80 backdrop-blur-sm',
						'transition-all duration-100 ease-in-out',
						{
							'opacity-100 visible pointer-events-auto': open,
							'opacity-0 invisible pointer-events-none': !open,
						},
						className
					)}
					{...rest}>
					<div ref={content} onClick={(e) => e.stopPropagation()}>
						{children}
					</div>
				</div>,
				document.body
			)}
		</ModalContext.Provider>
	);
};
