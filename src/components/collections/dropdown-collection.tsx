import * as React from 'react';
import {
	ArrowUpRight,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Copy,
	File,
	Folder,
	LogOut,
	Menu,
	Pencil,
	Settings,
	Share,
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
import { BlurDropdown } from '@/components/collections/dropdown/blur-dropdown';
import { FadeDropdown } from '@/components/collections/dropdown/fade-dropdown';
import { ScaleDropdown } from '@/components/collections/dropdown/scale-dropdown';
import { AccordionDropdown } from '@/components/collections/dropdown/accordion-dropdown';
import { StaggeredDropdown } from '@/components/collections/dropdown/staggered-dropdown';
import { TypewriterDropdown } from '@/components/collections/dropdown/typewriter-dropdown';
import { MenuItem } from '../primitive/menu-item';

interface DropdownCollectionProps {
	//
}

const Demo = () => {
	return (
		<React.Fragment>
			<label className='block px-3 py-3 text-sm font-medium'>Application menu</label>
			<hr className='border-b  border-dashed' />
			<DropdownItem position='end' label='Edit data' icon={Pencil} />
			<DropdownItem position='end' label='Duplicate data' icon={Copy} />
			<DropdownItem position='end' label='Open dashboard' icon={ArrowUpRight} />
			<DropdownItem position='end' label='Delete data' icon={Trash} variant='destructive' />
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
					<DropdownContent placement='bottom-center'>
						<Demo />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with avatar hover'>
				<Dropdown variant='hover'>
					<Avatar src='https://picsum.photos/seed/img1/400/300' alt='Avatar' />
					<DropdownContent placement='bottom-center'>
						<label className='block px-3 py-3 text-sm font-medium'>John Doe</label>
						<hr className='border-b  border-dashed' />
						<DropdownItem label='Profile' icon={User} />
						<DropdownItem label='Privacy' icon={TriangleAlert} />
						<DropdownItem label='Settings' icon={Settings} />
						<DropdownItem label='Logout' icon={LogOut} variant='destructive' />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with left top placement'>
				<Dropdown variant='hover'>
					<Button variant={variant}>
						<ChevronLeft size={16} />
						<span>Open left</span>
					</Button>
					<FadeDropdown placement='left-top'>
						<Demo />
					</FadeDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with right top placement'>
				<Dropdown variant='hover'>
					<Button variant={variant}>
						<span>Open right</span>
						<ChevronRight size={16} />
					</Button>
					<FadeDropdown placement='right-top'>
						<Demo />
					</FadeDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Fade dropdown with button click'>
				<Dropdown variant='hover'>
					<Button variant={variant}>
						<span>Fade</span>
						<ChevronDown size={16} />
					</Button>
					<FadeDropdown placement='bottom-center'>
						<Demo />
					</FadeDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Blur dropdown with button'>
				<Dropdown variant='hover'>
					<Button variant={variant}>
						<span>Blur</span>
						<ChevronDown size={16} />
					</Button>
					<BlurDropdown placement='bottom-center'>
						<Demo />
					</BlurDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Scale dropdown with button'>
				<Dropdown variant='hover'>
					<Button variant={variant}>
						<span>Scale</span>
						<ChevronDown size={16} />
					</Button>
					<ScaleDropdown placement='bottom-center'>
						<Demo />
					</ScaleDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Staggered dropdown with button'>
				<Dropdown variant='hover'>
					<Button variant={variant}>
						<span>Staggered</span>
						<ChevronDown size={16} />
					</Button>
					<StaggeredDropdown placement='bottom-center'>
						<Demo />
					</StaggeredDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Typewriter dropdown with button click'>
				<Dropdown variant='hover'>
					<Button variant={variant}>
						<span>Typewriter</span>
						<ChevronDown size={16} />
					</Button>
					<TypewriterDropdown placement='bottom-center'>
						<Demo />
					</TypewriterDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Accordion dropdown with button click'>
				<Dropdown variant='hover'>
					<Button variant={variant}>
						<span>Accordion</span>
						<ChevronDown size={16} />
					</Button>
					<AccordionDropdown placement='bottom-center'>
						<Demo />
					</AccordionDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Dropdown with menu content'>
				<Dropdown variant='hover'>
					<Button variant={variant}>
						<Menu size={16} />
						<span>Open Menu</span>
					</Button>
					<BlurDropdown placement='right-bottom' className='min-w-72'>
						<MenuItem label='Profile' icon={User} />
						<MenuItem label='Account Settings' icon={Settings} />
						<MenuItem label='Files' icon={Folder}>
							<MenuItem label='Recent' icon={File} />
							<MenuItem label='Starred' icon={ArrowUpRight} />
							<MenuItem label='Shared' icon={Share} />
						</MenuItem>
						<MenuItem label='Notifications' icon={TriangleAlert} />
						<hr className='border-b  border-dashed' />
						<MenuItem label='Logout' icon={LogOut} variant='destructive' />
					</BlurDropdown>
				</Dropdown>
			</Showcase>
		</Gallery>
	);
};
