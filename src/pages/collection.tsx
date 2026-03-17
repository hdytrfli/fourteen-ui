import * as React from 'react';
import { Navigation } from '@/components/navigation';

interface CollectionPageProps extends React.ComponentProps<'div'> {
	title: string;
	description: string;
}

export default function CollectionPage({
	title,
	description,
	children,
}: CollectionPageProps): React.JSX.Element {
	return (
		<React.Fragment>
			<header className='grid gap-2'>
				<div className='flex items-center justify-between'>
					<h1 className='text-4xl font-heading'>{title}</h1>
					<Navigation />
				</div>
				<p className='max-w-2xl'>{description}</p>
			</header>

			<div className='grid gap-20'>{children}</div>
		</React.Fragment>
	);
}
