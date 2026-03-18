import * as React from 'react';
import { useNavigate } from 'react-router';
import {
	ArrowUpRight,
	Box,
	Home,
	Layers,
	List,
	Menu,
	MessageCircle,
	PanelTopDashed,
	PenLine,
	PictureInPicture2,
	ScanLine,
} from 'lucide-react';

import { Button } from '@/components/primitive/button';
import { Dropdown } from '@/components/primitive/dropdown';
import { DropdownItem } from '@/components/primitive/dropdown-item';
import { StaggeredDropdown } from '@/components/collections/dropdown/staggered-dropdown';

export const Navigation: React.FC = () => {
	const navigate = useNavigate();

	const links = [
		{ label: 'All collections', to: '/', icon: Home },
		{ label: 'Button collections', to: '/buttons', icon: ArrowUpRight },
		{ label: 'Variant collections', to: '/variants', icon: Box },
		{ label: 'Input collections', to: '/inputs', icon: ScanLine },
		{ label: 'Select collections', to: '/select', icon: List },
		{ label: 'Textarea collections', to: '/textarea', icon: PenLine },
		{ label: 'Tooltip collections', to: '/tooltips', icon: MessageCircle },
		{ label: 'Dropdown collections', to: '/dropdowns', icon: Menu },
		{ label: 'Menu collections', to: '/menus', icon: Layers },
		{ label: 'Card collections', to: '/cards', icon: PanelTopDashed },
		{ label: 'Modal collections', to: '/modal', icon: PictureInPicture2 },
	];

	return (
		<Dropdown variant='hover'>
			<Button variant='ghost'>
				<Menu size={16} />
			</Button>

			<StaggeredDropdown placement='bottom-right'>
				<label className='block px-3 py-3 text-sm font-medium'>Application menu</label>
				<hr className='border-b border-border border-dashed block mb-1'></hr>
				{links.map(({ to, label, icon }) => (
					<DropdownItem
						key={to}
						icon={icon}
						label={label}
						position='end'
						onClick={() => navigate(to, { viewTransition: true })}
					/>
				))}
			</StaggeredDropdown>
		</Dropdown>
	);
};
