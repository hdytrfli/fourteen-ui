import { cn } from '@/libs/utils';
import { Copyright, Github } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router';

interface FooterProps extends React.ComponentProps<'div'> {
	//
}

export const Footer: React.FC<FooterProps> = ({ className, ...props }) => {
	const year = new Date().getFullYear();

	return (
		<footer
			aria-label='Footer'
			className={cn('text-center', 'flex items-center justify-between', className)}
			{...props}>
			<span className='flex items-center gap-2'>
				Copyright <Copyright size={16} /> {year} Fourteen Studio
			</span>
			<Link
				to='https://github.com/hdytrfli/fourteen-ui'
				className='no-underline flex items-center gap-2'>
				<Github size={16} />
				<span>GitHub</span>
			</Link>
		</footer>
	);
};
