import * as React from 'react';
import { Footer } from '@/components/footer';
import { Outlet } from 'react-router';

interface BaseLayoutProps {
	//
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ ...props }) => {
	return (
		<main className='container min-h-screen' {...props}>
			<div className='py-20 grid gap-8'>
				<Outlet />
			</div>
			<Footer className='py-16' />
		</main>
	);
};
