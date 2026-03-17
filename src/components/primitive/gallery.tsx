import * as React from 'react';

import { cn } from '@/libs/utils';
import { CollectionHeader } from '@/components/primitive/header';

interface GalleryProps extends React.ComponentProps<'section'> {
	title: string;
	description: string;
	children: React.ReactNode;
}

export const Gallery: React.FC<GalleryProps> = ({
	title,
	description,
	className,
	children,
	...props
}) => {
	return (
		<section className='grid gap-2' {...props}>
			<CollectionHeader title={title} description={description} />
			<div className={cn('grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-16 group', className)}>
				{children}
			</div>
		</section>
	);
};
