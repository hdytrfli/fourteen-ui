import * as React from 'react';

import { cn } from '@/libs/utils';
import { CollectionHeader } from '@/components/primitive/header';

interface GalleryProps extends React.ComponentProps<'section'> {
	title: string;
	description: string;
	children: React.ReactNode;
}

export const Gallery: React.FC<GalleryProps> = ({ title, description, className, children, ...props }) => {
	return (
		<section className={cn('grid gap-2', className)} {...props}>
			<CollectionHeader title={title} description={description} />
			<div className='grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-12 group'>{children}</div>
		</section>
	);
};
