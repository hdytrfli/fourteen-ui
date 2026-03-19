import * as React from 'react';
import { Outlet } from 'react-router';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/scroll-progress';
import { useConfig } from '@/contexts/config-context';

interface BaseLayoutProps {
	//
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ ...props }) => {
	const { config } = useConfig();
	const ref = React.useRef<HTMLDivElement>(null);

	return (
		<React.Fragment>
			{config.scrolltop && (
				<div className='fixed bottom-0 right-0 m-8'>
					<ScrollProgress />
				</div>
			)}

			<main ref={ref} className='container min-h-screen' {...props}>
				<div className='py-20 grid gap-8'>
					<Outlet />
				</div>
				<Footer className='py-16' />
			</main>
		</React.Fragment>
	);
};
