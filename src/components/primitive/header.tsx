import * as React from 'react';

import { cn } from '@/libs/utils';

interface CollectionHeaderProps extends React.ComponentProps<'header'> {
	title: string;
	description: string;
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({
	title,
	description,
	className,
	...props
}) => {
	return (
		<header
			className={cn('flex flex-col md:flex-row md:gap-4 md:items-center', className)}
			{...props}>
			<h2 className='text-lg font-medium'>{title}</h2>
			<div className='hidden md:flex flex-1 border border-dashed border-border'></div>
			<p className='text-zinc-500'>{description}</p>
		</header>
	);
};
