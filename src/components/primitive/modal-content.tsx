import * as React from 'react';
import { cn } from '@/libs/utils';
import { useModal } from '@/hooks/use-modal';
import { Card } from '@/components/primitive/card';
import { CardHeader } from '@/components/primitive/card-header';
import { CardContent } from '@/components/primitive/card-content';
import { CardFooter } from '@/components/primitive/card-footer';

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

interface Props extends React.ComponentProps<typeof Card> {
	children: React.ReactNode;
	title: string;
	closeable?: boolean;
	size?: Size;
}

/**
 * Modal panel with a titled header and scrollable body built on top of Card.
 * @param children - Body content and optionally ModalFooter
 * @param title - Title displayed in the card header
 * @param showClose - Whether to show the close button (default: true)
 * @param size - Width of the modal (default: 'md')
 */
export const ModalContent = ({
	children,
	title,
	closeable = true,
	size = 'md',
	className,
	...rest
}: Props) => {
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
