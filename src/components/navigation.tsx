import * as React from 'react';
import { useNavigate } from 'react-router';
import { Home, Menu } from 'lucide-react';

import { PAGES } from '@/libs/pages';
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
				<DropdownItem
					icon={Home}
					position='end'
					label='All collections'
					onClick={() => navigate('/')}
				/>

				{PAGES.map(({ path, label, icon }) => (
					<DropdownItem
						key={path}
						icon={icon}
						label={label}
						position='end'
						onClick={() => navigate(path)}
					/>
				))}
			</StaggeredDropdown>
		</Dropdown>
	);
};
