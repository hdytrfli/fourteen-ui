import * as React from 'react';
import { Bolt, Home, Menu } from 'lucide-react';
import { useNavigate } from 'react-router';

import { PAGES } from '@/libs/pages';
import { useTheme } from '@/contexts/theme-context';
import { useConfig } from '@/contexts/config-context';

import { Divider } from '@/components/primitive/divider';
import { DropdownItem, Dropdown, DropdownAction } from '@/components/primitive/dropdown';

import { Button } from '@/components/primitive/button';
import { Switch } from '@/components/primitive/switch';
import { MenuItem } from '@/components/primitive/menu';
import { StaggeredDropdown } from '@/components/collections/dropdown/staggered-dropdown';

export const Navigation: React.FC = () => {
	const navigate = useNavigate();
	const { config, toggle } = useConfig();
	const { theme, icon, rotate } = useTheme();

	const ThemeIcon = icon;

	const input = PAGES.filter((item) => item.type === 'form');
	const other = PAGES.filter((item) => item.type === 'other');

	return (
		<div className='flex items-center gap-4'>
			{config.theme && (
				<Button variant='transparent' onClick={rotate}>
					<span key={theme} className='animate-in fade-in spin-in-90 duration-300 ease-in-out'>
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
					<Divider />
					<DropdownItem label='Theme toggle'>
						<Switch checked={config.theme} onChange={() => toggle('theme')} />
					</DropdownItem>
					<DropdownItem label='Scroll to top'>
						<Switch checked={config.scrolltop} onChange={() => toggle('scrolltop')} />
					</DropdownItem>
					<DropdownItem label='Table of contents'>
						<Switch checked={config.toc} onChange={() => toggle('toc')} />
					</DropdownItem>
					<DropdownItem label='Table of contents position'>
						<Switch checked={config.position} onChange={() => toggle('position')} />
					</DropdownItem>
				</StaggeredDropdown>
			</Dropdown>

			<Dropdown variant='hover'>
				<Button variant='ghost'>
					<Menu size={16} />
				</Button>

				<StaggeredDropdown placement='bottom-right' className='min-w-72'>
					<DropdownItem label='Navigations' />
					<Divider />
					<DropdownAction icon={Home} label='All collections' onClick={() => navigate('/')} />
					<MenuItem label='Form collections'>
						{input.map(({ path, label, icon }) => (
							<MenuItem
								key={path}
								position='end'
								label={label}
								icon={icon}
								onClick={() => navigate(path)}
							/>
						))}
					</MenuItem>
					{other.map(({ path, label, icon }) => (
						<DropdownAction
							key={path}
							icon={icon}
							position='end'
							label={label}
							onClick={() => navigate(path)}
						/>
					))}
				</StaggeredDropdown>
			</Dropdown>
		</div>
	);
};
