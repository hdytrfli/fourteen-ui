import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cn } from '@/libs/utils';
import { ModalContext } from '@/hooks/use-modal';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { useModal } from '@/hooks/use-modal';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/primitive/card';

interface ModalProps extends React.ComponentProps<'div'> {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

/**
 * Modal root with backdrop that manages open state, scroll lock, focus trap, and outside click.
 * Renders via portal to escape stacking context issues.
 */
export const Modal = ({ open, onClose, children, className, ...rest }: ModalProps) => {
	const content = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const root = document.documentElement;

		if (open) root.classList.add('overflow-hidden');
		else root.classList.remove('overflow-hidden');

		return () => root.classList.remove('overflow-hidden');
	}, [open]);

	useFocusTrap(content, open, onClose);

	if (!open) return null;
	return (
		<ModalContext.Provider value={{ open, close: onClose, content }}>
			{ReactDOM.createPortal(
				<div
					role='dialog'
					aria-modal='true'
					onClick={onClose}
					className={cn(
						'fixed inset-0 z-50',
						'flex items-center justify-center',
						'bg-black/50 backdrop-blur-sm',
						'opacity-100 visible pointer-events-auto',
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

const variants = {
	size: {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-2xl',
		xl: 'max-w-4xl',
		full: 'max-w-full',
	},
} as const;

type Size = keyof typeof variants.size;

interface ModalContentProps extends React.ComponentProps<typeof Card> {
	children: React.ReactNode;
	title: string;
	closeable?: boolean;
	size?: Size;
}

/**
 * Modal panel with a titled header and scrollable body built on top of Card.
 */
export const ModalContent = ({
	children,
	title,
	closeable = true,
	size = 'md',
	className,
	...rest
}: ModalContentProps) => {
	const { close } = useModal();

	return (
		<Card
			role='dialog'
			aria-modal='true'
			aria-label={title}
			onClick={(e) => e.stopPropagation()}
			className={cn(variants.size[size], 'w-full', className)}
			{...rest}>
			<CardHeader title={title} onClose={closeable ? close : undefined} />
			{children}
		</Card>
	);
};

export const ModalBody = CardContent;
export const ModalFooter = CardFooter;
