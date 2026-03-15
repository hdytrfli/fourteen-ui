import * as React from 'react';
import { ChevronDown, Copy, LogOut, Pencil, Settings, Trash, TriangleAlert, User } from 'lucide-react';

import { Button } from '@/components/primitive/button';
import { Avatar } from '@/components/primitive/avatar';
import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';

import { Dropdown } from '@/components/primitive/dropdown';
import { DropdownItem } from '@/components/primitive/dropdown-item';
import { DropdownContent } from '@/components/primitive/dropdown-content';
import { StaggeredDropdown } from './collections/dropdown/staggered-dropdown';
import { BlurDropdown } from './collections/dropdown/blur-dropdown';
import { FadeDropdown } from './collections/dropdown/fade-dropdown';

interface DropdownCollectionProps {
	//
}

export const DropdownCollection: React.FC<DropdownCollectionProps> = () => {
	return (
		<Gallery title='Dropdown' description='A collection of button dropdown components.'>
			<Showcase label='Plain dropdown with button'>
				<Dropdown>
					<Button variant='primary'>
						<span>Dropdown</span>
						<ChevronDown size={16} />
					</Button>
					<DropdownContent>
						<DropdownItem label='Edit' icon={Pencil} />
						<DropdownItem label='Duplicate' icon={Copy} />
						<DropdownItem label='Delete' icon={Trash} />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with label'>
				<Dropdown>
					<label className='text-foreground underline underline-offset-2 decoration-wavy cursor-pointer'>
						Dropdown
					</label>
					<DropdownContent>
						<DropdownItem label='Edit' icon={Pencil} />
						<DropdownItem label='Duplicate' icon={Copy} />
						<DropdownItem label='Delete' icon={Trash} />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with avatar'>
				<Dropdown>
					<Avatar src='https://picsum.photos/seed/img1/400/300' alt='Avatar' />
					<DropdownContent>
						<DropdownItem label='Profile' icon={User} />
						<DropdownItem label='Privacy' icon={TriangleAlert} />
						<DropdownItem label='Settings' icon={Settings} />
						<DropdownItem label='Logout' icon={LogOut} />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Fade dropdown with button'>
				<Dropdown>
					<Button variant='primary'>
						<span>Fade</span>
						<ChevronDown size={16} />
					</Button>
					<FadeDropdown>
						<DropdownItem label='Edit' icon={Pencil} />
						<DropdownItem label='Duplicate' icon={Copy} />
						<DropdownItem label='Delete' icon={Trash} />
					</FadeDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Staggered dropdown with button'>
				<Dropdown>
					<Button variant='primary'>
						<span>Staggered</span>
						<ChevronDown size={16} />
					</Button>
					<StaggeredDropdown>
						<DropdownItem label='Edit' icon={Pencil} />
						<DropdownItem label='Duplicate' icon={Copy} />
						<DropdownItem label='Delete' icon={Trash} />
					</StaggeredDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Blur dropdown with button'>
				<Dropdown>
					<Button variant='primary'>
						<span>Blur</span>
						<ChevronDown size={16} />
					</Button>
					<BlurDropdown>
						<DropdownItem label='Edit' icon={Pencil} />
						<DropdownItem label='Duplicate' icon={Copy} />
						<DropdownItem label='Delete' icon={Trash} />
					</BlurDropdown>
				</Dropdown>
			</Showcase>
		</Gallery>
	);
};
