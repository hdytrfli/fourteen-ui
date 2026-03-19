import * as React from 'react';
import { Bolt, Home, Menu } from 'lucide-react';
import { useNavigate } from 'react-router';

import { PAGES } from '@/libs/pages';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/primitive/button';
import {
	DropdownItem,
	Dropdown,
	DropdownDivider,
	DropdownAction,
} from '@/components/primitive/dropdown';
import { StaggeredDropdown } from '@/components/collections/dropdown/staggered-dropdown';
import { useConfig } from '@/contexts/config-context';
import { Switch } from './primitive/switch';

export const Navigation: React.FC = () => {
	const navigate = useNavigate();
	const { config, toggle } = useConfig();
	const { theme, icon, rotate } = useTheme();

	const ThemeIcon = icon;

	return (
		<div className='flex items-center gap-4'>
			{config.theme && (
				<Button variant='transparent' onClick={rotate}>
					<span key={theme} className='animate-in fade-in spin-in-90 duration-300'>
						<ThemeIcon size={16} />
					</span>
				</Button>
			)}

			<Dropdown variant='hover'>
				<Button variant='ghost'>
					<Bolt size={16} />
				</Button>

				<StaggeredDropdown placement='bottom-right' className='min-w-60'>
					<DropdownItem label='Configuration' />
					<DropdownDivider />
					<DropdownItem label='Table of contents'>
						<Switch checked={config.toc} onChange={() => toggle('toc')} />
					</DropdownItem>
					<DropdownItem label='Scroll to top'>
						<Switch checked={config.scrolltop} onChange={() => toggle('scrolltop')} />
					</DropdownItem>
					<DropdownItem label='Theme toggle'>
						<Switch checked={config.theme} onChange={() => toggle('theme')} />
					</DropdownItem>
				</StaggeredDropdown>
			</Dropdown>

			<Dropdown variant='hover'>
				<Button variant='ghost'>
					<Menu size={16} />
				</Button>
				<StaggeredDropdown placement='bottom-right' className='min-w-60'>
					<DropdownItem label='Navigations' />
					<DropdownDivider />
					<DropdownAction icon={Home} label='All collections' onClick={() => navigate('/')} />
					{PAGES.map(({ path, label, icon }) => (
						<DropdownAction key={path} icon={icon} label={label} onClick={() => navigate(path)} />
					))}
				</StaggeredDropdown>
			</Dropdown>
		</div>
	);
};
