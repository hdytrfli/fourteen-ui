import * as React from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Box, Home, Menu, PanelTopDashed, PictureInPicture2 } from 'lucide-react';

import { Dropdown } from '@/components/primitive/dropdown';
import { DropdownItem } from '@/components/primitive/dropdown-item';
import { RollingButton } from '@/components/collections/button/rolling-button';
import { DropdownContent } from '@/components/primitive/dropdown-content';

export const Navigation: React.FC = () => {
	const links = [
		{ label: 'All collections', to: '/', icon: Home },
		{ label: 'Button collectionsa', to: '/buttons', icon: ArrowUpRight },
		{ label: 'Variant collections', to: '/variants', icon: Box },
		{ label: 'Dropdown collections', to: '/dropdowns', icon: Menu },
		{ label: 'Card collections', to: '/cards', icon: PanelTopDashed },
		{ label: 'Modal collections', to: '/modal', icon: PictureInPicture2 },
	];

	return (
		<Dropdown variant='hover'>
			<RollingButton variant='ghost' label='Menu' hover='Navigation' />
			<DropdownContent placement='bottom-right'>
				{links.map(({ to, label, icon }) => (
					<Link to={to} key={to} className='no-underline'>
						<DropdownItem label={label} icon={icon} position='end' />
					</Link>
				))}
			</DropdownContent>
		</Dropdown>
	);
};
