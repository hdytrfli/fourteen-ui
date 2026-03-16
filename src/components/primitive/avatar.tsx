import { cn } from '@/libs/utils';
import * as React from 'react';

interface AvatarProps extends React.ComponentProps<'button'> {
	src: string;
	alt: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, className, ...props }) => {
	return (
		<button
			role='button'
			aria-label={alt}
			className={cn(
				'size-12 select-none',
				'rounded-full bg-background',
				'cursor-pointer overflow-hidden',
				'focus-visible:ring-2 focus-visible:ring-accent outline-none',
				className
			)}
			{...props}>
			<img src={src} alt={alt} className='w-full h-full object-cover' />
		</button>
	);
};
