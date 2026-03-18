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
	const id = React.useId();

	return (
		<header
			className={cn('flex flex-col md:flex-row md:gap-4 md:items-center', className)}
			{...props}>
			<h2 id={id} className='text-lg font-medium'>
				{title}
			</h2>
			<div className='hidden md:flex flex-1 border border-dashed '></div>
			<p className='text-text'>{description}</p>
		</header>
	);
};
