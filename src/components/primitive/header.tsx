import * as React from 'react';

import { cn } from '@/libs/utils';

interface CollectionHeaderProps extends React.ComponentProps<'header'> {
	title: string;
	description: string;
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({ title, description, className, ...props }) => {
	return (
		<header className={cn('flex gap-2 items-center', className)} {...props}>
			<h2 className='text-lg font-medium'>{title}</h2>
			<div className='flex-1 border border-dashed border-zinc-800'></div>
			<p className='text-zinc-500'>{description}</p>
		</header>
	);
};
