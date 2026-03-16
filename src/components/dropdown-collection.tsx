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

import { Avatar } from '@/components/primitive/avatar';
import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { Button, type ButtonVariant } from '@/components/primitive/button';

import { Dropdown } from '@/components/primitive/dropdown';
import { DropdownItem } from '@/components/primitive/dropdown-item';
import { DropdownContent } from '@/components/primitive/dropdown-content';
import { StaggeredDropdown } from './collections/dropdown/staggered-dropdown';
import { BlurDropdown } from './collections/dropdown/blur-dropdown';
import { FadeDropdown } from './collections/dropdown/fade-dropdown';

interface DropdownCollectionProps {
	//
}

const Demo = () => {
	return (
		<React.Fragment>
			<DropdownItem label='Edit' icon={Pencil} />
			<DropdownItem label='Duplicate' icon={Copy} />
			<DropdownItem label='Delete' icon={Trash} variant='destructive' />
		</React.Fragment>
	);
};

export const DropdownCollection: React.FC<DropdownCollectionProps> = () => {
	const variant: ButtonVariant = 'secondary';

	return (
		<Gallery title='Dropdown' description='A collection of button dropdown components.'>
			<Showcase label='Plain dropdown with button click'>
				<Dropdown>
					<Button variant={variant}>
						<span>Dropdown</span>
						<ChevronDown size={16} />
					</Button>
					<DropdownContent>
						<Demo />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with button hover'>
				<Dropdown variant='hover'>
					<Button variant={variant}>
						<span>Dropdown</span>
						<ChevronDown size={16} />
					</Button>
					<DropdownContent placement='bottom-center'>
						<Demo />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with label hover'>
				<Dropdown variant='hover'>
					<label className='text-foreground link-accent cursor-pointer'>Dropdown</label>
					<DropdownContent>
						<Demo />
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
						<DropdownItem label='Logout' icon={LogOut} variant='destructive' />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Fade dropdown with button click'>
				<Dropdown>
					<Button variant={variant}>
						<span>Fade</span>
						<ChevronDown size={16} />
					</Button>
					<FadeDropdown>
						<Demo />
					</FadeDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Staggered dropdown with button click'>
				<Dropdown>
					<Button variant={variant}>
						<span>Staggered</span>
						<ChevronDown size={16} />
					</Button>
					<StaggeredDropdown>
						<Demo />
					</StaggeredDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Blur dropdown with button click'>
				<Dropdown>
					<Button variant={variant}>
						<span>Blur</span>
						<ChevronDown size={16} />
					</Button>
					<BlurDropdown>
						<Demo />
					</BlurDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with left top placement'>
				<Dropdown variant='click'>
					<Button variant={variant}>
						<ChevronLeft size={16} />
						<span>Open left</span>
					</Button>
					<StaggeredDropdown placement='left-top'>
						<Demo />
					</StaggeredDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with right top placement'>
				<Dropdown variant='click'>
					<Button variant={variant}>
						<span>Open right</span>
						<ChevronRight size={16} />
					</Button>
					<StaggeredDropdown placement='right-top'>
						<Demo />
					</StaggeredDropdown>
				</Dropdown>
			</Showcase>
		</Gallery>
	);
};
