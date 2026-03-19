import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/libs/utils';

interface CardProps extends React.ComponentProps<'div'> {
	children: React.ReactNode;
}

/**
 * Card root container with consistent border, background, and sizing.
 */
export const Card = ({ children, className, ...rest }: CardProps) => {
	return (
		<div
			className={cn(
				'rounded-2xl',
				'border ',
				'w-full overflow-hidden',
				'text-foreground bg-background',
				className
			)}
			{...rest}>
			{children}
		</div>
	);
};

interface CardHeaderProps extends React.ComponentProps<'header'> {
	title: string;
	onClose?: () => void;
}

/**
 * Card header with a mandatory title and an optional close button.
 */
export const CardHeader = ({ title, onClose, className, ...rest }: CardHeaderProps) => {
	return (
		<header className={cn('p-6 relative', 'flex items-center', 'border-b ', className)} {...rest}>
			<h5 className='line-clamp-1 truncate max-w-[90%] text-base font-medium'>{title}</h5>
			{onClose && (
				<button
					aria-label='Close'
					onClick={onClose}
					className={cn(
						'cursor-pointer',
						'size-10 rounded-xl',
						'bg-ghost text-foreground',
						'flex items-center justify-center',
						'absolute top-1/2 right-6 -translate-y-1/2',
						'focus-visible:ring-2 focus-visible:ring-accent outline-none'
					)}>
					<X size={14} />
				</button>
			)}
		</header>
	);
};

interface CardContentProps extends React.ComponentProps<'div'> {
	children: React.ReactNode;
}

/**
 * Card body with scrollable content area.
 */
export const CardContent = ({ children, className, ...rest }: CardContentProps) => {
	return (
		<div
			className={cn('px-6 py-5', 'text-foreground overflow-y-auto scrollbar-none', className)}
			{...rest}>
			{children}
		</div>
	);
};

interface CardFooterProps extends React.ComponentProps<'footer'> {
	children: React.ReactNode;
}

/**
 * Card footer with a two-column grid for action buttons.
 */
export const CardFooter = ({ children, className, ...rest }: CardFooterProps) => {
	return (
		<footer
			className={cn(
				'px-6 py-4',
				'bg-background',
				'border-t ',
				'grid md:grid-cols-2 gap-4',
				className
			)}
			{...rest}>
			{children}
		</footer>
	);
};
