import * as React from 'react';
import { Navbar } from '@/components/navbar';

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
			<Navbar title={title}>{description}</Navbar>
			<div className='grid gap-20'>{children}</div>
		</React.Fragment>
	);
}
