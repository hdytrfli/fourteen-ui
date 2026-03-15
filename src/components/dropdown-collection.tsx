import * as React from 'react';
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Copy,
	LogOut,
	Pencil,
	Settings,
	Trash,
	TriangleAlert,
	User,
} from 'lucide-react';

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
			<Showcase label='Plain dropdown with button click'>
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
			<Showcase label='Plain dropdown with button hover'>
				<Dropdown variant='hover'>
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
			<Showcase label='Plain dropdown with label hover'>
				<Dropdown variant='hover'>
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
			<Showcase label='Plain dropdown with avatar hover'>
				<Dropdown variant='hover'>
					<Avatar src='https://picsum.photos/seed/img1/400/300' alt='Avatar' />
					<DropdownContent>
						<DropdownItem label='Profile' icon={User} />
						<DropdownItem label='Privacy' icon={TriangleAlert} />
						<DropdownItem label='Settings' icon={Settings} />
						<DropdownItem label='Logout' icon={LogOut} />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Fade dropdown with button click'>
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
			<Showcase label='Staggered dropdown with button click'>
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

			<Showcase label='Blur dropdown with button click'>
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

			<Showcase label='Plain dropdown with left top placement'>
				<Dropdown variant='click'>
					<Button variant='primary'>
						<ChevronLeft size={16} />
						<span>Open left</span>
					</Button>
					<StaggeredDropdown placement='left-top'>
						<DropdownItem label='Edit' icon={Pencil} />
						<DropdownItem label='Duplicate' icon={Copy} />
						<DropdownItem label='Delete' icon={Trash} />
					</StaggeredDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with right top placement'>
				<Dropdown variant='click'>
					<Button variant='primary'>
						<span>Open right</span>
						<ChevronRight size={16} />
					</Button>
					<StaggeredDropdown placement='right-top'>
						<DropdownItem label='Edit' icon={Pencil} />
						<DropdownItem label='Duplicate' icon={Copy} />
						<DropdownItem label='Delete' icon={Trash} />
					</StaggeredDropdown>
				</Dropdown>
			</Showcase>
		</Gallery>
	);
};
