import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { cn } from '@/libs/utils';
import { useModal } from '@/hooks/use-modal';
import { ModalContext } from '@/hooks/use-modal';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/primitive/card';

interface ModalProps extends React.ComponentProps<'div'> {
	open: boolean;
	onClick: () => void;
	children: React.ReactNode;
	trapFocus?: boolean;
}

/**
 * Modal root with backdrop that manages open state, scroll lock, focus trap, and outside click.
 * Renders via portal to escape stacking context issues.
 */
export const Modal = ({
	open,
	onClick,
	children,
	className,
	trapFocus = true,
	...rest
}: ModalProps) => {
	const content = React.useRef<HTMLDivElement>(null);

	useFocusTrap({
		ref: content,
		active: trapFocus,
		onEscape: onClick,
	});

	if (!open) return null;

	return (
		<ModalContext.Provider value={{ open, onClick, content }}>
			{ReactDOM.createPortal(
				<div
					role='dialog'
					aria-modal='true'
					onClick={onClick}
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
	size?: Size;
	title: string;
	closeable?: boolean;
	children: React.ReactNode;
}

/**
 * Modal panel with a titled header and scrollable body built on top of Card.
 */
export const ModalContent = ({
	title,
	className,
	children,
	size = 'md',
	closeable = true,
	...rest
}: ModalContentProps) => {
	const { onClick } = useModal();

	return (
		<Card
			role='dialog'
			aria-modal='true'
			aria-label={title}
			className={cn(variants.size[size], 'w-full', className)}
			{...rest}>
			<CardHeader title={title} onClose={closeable ? onClick : undefined} />
			{children}
		</Card>
	);
};

export const ModalBody = CardContent;
export const ModalFooter = CardFooter;
