import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cn } from '@/libs/utils';
import { useModal } from '@/hooks/use-modal';

interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode;
}

/**
 * Full screen backdrop that renders via portal and closes the modal on click.
 * @param children - ModalContent component
 */
export const ModalBackdrop = ({ children, className, ...rest }: Props) => {
	const { open, close, content } = useModal();

	return ReactDOM.createPortal(
		<div
			aria-hidden={!open}
			onClick={close}
			className={cn(
				'fixed inset-0 z-50',
				'flex items-center justify-center',
				'bg-zinc-950/80 backdrop-blur-sm',
				{
					'visible pointer-events-auto': open,
					'invisible pointer-events-none': !open,
				},
				className
			)}
			{...rest}>
			<div ref={content} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>,
		document.body
	);
};
