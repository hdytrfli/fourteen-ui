import * as React from 'react';
import { Link } from 'react-router';

import { ButtonCollection } from '@/components/button-collection';
import { VariantCollection } from '@/components/variant-collection';
import { Footer } from '@/components/footer';

export default function App(): React.JSX.Element {
	return (
		<main className='container min-h-screen'>
			<div className='relative py-20 grid gap-8'>
				<header className='grid gap-2 max-w-3xl'>
					<h1 className='text-4xl font-heading'>Idea collections</h1>
					<p>
						Collections of ideas for your next project. Built with <Link to='https://reactjs.org/'>React</Link> and{' '}
						<Link to='https://tailwindcss.com/'>Tailwind CSS</Link> and animated using{' '}
						<Link to='https://greensock.com/'>GreenSock</Link> animations, this stack is purposely used to make the
						components easily trasnferable to other frameworks.
					</p>
				</header>

				<div className='grid gap-20'>
					<ButtonCollection />
					<VariantCollection />
				</div>
			</div>

			<Footer className='py-16' />
		</main>
	);
}
