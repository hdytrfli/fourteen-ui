import * as React from 'react';

import { cn } from '@/libs/utils';
import { X } from 'lucide-react';

interface CardTestProps extends React.ComponentProps<'div'> {
	title: string;
	closeable?: boolean;
	children: React.ReactNode;
}

export const CardTest: React.FC<CardTestProps> = ({
	title,
	closeable = false,
	children,
	className,
	...props
}) => {
	return (
		<div
			className={cn(
				'relative',
				'border border-border',
				'max-w-md w-full overflow-hidden',
				'rounded-2xl text-foreground bg-background',
				className
			)}
			{...props}>
			<header className={cn('relative', 'border-b border-border p-6')}>
				<h2 className='line-clamp-1 truncate max-w-10/12'>{title}</h2>
				{closeable && (
					<div className='absolute top-1/2 right-6 -translate-y-1/2'>
						<button
							aria-label='Close'
							className='size-10 bg-border flex items-center justify-center rounded-full cursor-pointer'>
							<X size={16} />
						</button>
					</div>
				)}
			</header>

			<div className='px-6 py-5 max-h-60 overflow-y-scroll scrollbar-none'>{children}</div>

			<footer
				className={cn(
					'bg-background',
					'border-t border-border',
					'grid grid-cols-2 px-6 py-5 gap-3'
				)}>
				<button className='rounded-xl px-6 py-3 bg-foreground/5 cursor-pointer'>
					Secondary action
				</button>
				{/* <button className='rounded-xl py-3 bg-rose-600 hover:bg-rose-700 cursor-pointer'>
					Destructive Action
				</button> */}
				<button className='rounded-xl px-6 py-3 bg-foreground text-background cursor-pointer'>
					Primary Action
				</button>
			</footer>
		</div>
	);
};
