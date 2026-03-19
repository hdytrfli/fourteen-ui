import * as React from 'react';

import { cn } from '@/libs/utils';
import { Navigation } from '@/components/navigation';

interface NavbarProps extends React.ComponentProps<'header'> {
	title: string;
	children: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ title, className, children, ...props }) => {
	return (
		<header className={cn('grid gap-2', className)} {...props}>
			<div className='flex items-center justify-between'>
				<h1 id='title' className='text-4xl font-heading'>
					{title}
				</h1>
				<Navigation />
			</div>
			<p className='max-w-2xl'>{children}</p>
		</header>
	);
};
