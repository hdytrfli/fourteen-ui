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
	Power,
	ScanLine,
} from 'lucide-react';

import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/primitive/button';
import { Switch } from '@/components/primitive/switch';
import { Dropdown, DropdownItem } from '@/components/primitive/dropdown';
import { StaggeredDropdown } from '@/components/collections/dropdown/staggered-dropdown';

export const Navigation: React.FC = () => {
	const { theme, setTheme } = useTheme();
	const navigate = useNavigate();

	const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');
	const dark = theme === 'dark';

	const links = [
		{ label: 'All collections', to: '/', icon: Home },
		{ label: 'Button collections', to: '/buttons', icon: ArrowUpRight },
		{ label: 'Variant collections', to: '/variants', icon: Box },
		{ label: 'Input collections', to: '/inputs', icon: ScanLine },
		{ label: 'Select collections', to: '/select', icon: List },
		{ label: 'Switch collections', to: '/switch', icon: Power },
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

			<StaggeredDropdown placement='bottom-right' className='min-w-60'>
				<div className='flex items-center justify-between p-3'>
					<label className='text-sm font-medium'>Toggle theme</label>
					<Switch checked={dark} onCheckedChange={toggle} aria-label='Toggle theme' />
				</div>

				<hr className='border-b  border-dashed block mb-1'></hr>
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
