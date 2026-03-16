import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'header'> {
	title: string;
	onClose?: () => void;
}

/**
 * Card header with a mandatory title and an optional close button.
 * @param title - Title displayed in the header
 * @param onClose - If provided, renders a close button that calls this on click
 */
export const CardHeader = ({ title, onClose, className, ...rest }: Props) => {
	return (
		<header
			className={cn('p-6 relative', 'flex items-center', 'border-b border-border', className)}
			{...rest}>
			<h2 className='line-clamp-1 truncate max-w-[90%] text-base font-medium'>{title}</h2>
			{onClose && (
				<button
					aria-label='Close'
					onClick={onClose}
					className={cn(
						'cursor-pointer',
						'size-10 rounded-xl',
						'bg-border text-foreground',
						'flex items-center justify-center',
						'absolute top-1/2 right-6 -translate-y-1/2',
						'focus-visible:ring-2 focus-visible:ring-foreground outline-none'
					)}>
					<X size={14} />
				</button>
			)}
		</header>
	);
};
