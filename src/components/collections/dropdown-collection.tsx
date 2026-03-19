import * as React from 'react';
import {
	ArrowUpRight,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	File,
	LogOut,
	Menu,
	Settings,
	Share,
	TriangleAlert,
	User,
} from 'lucide-react';

import { Avatar } from '@/components/primitive/avatar';
import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { Button, type ButtonVariant } from '@/components/primitive/button';

import { type Placement } from '@/libs/types';
import { PLACEMENTS } from '@/libs/constants';
import { Select } from '@/components/primitive/select';
import { MenuItem } from '@/components/primitive/menu';
import { DropdownDemo } from '@/components/demo/shared';
import { BlurDropdown } from '@/components/collections/dropdown/blur-dropdown';
import { FadeDropdown } from '@/components/collections/dropdown/fade-dropdown';
import { ScaleDropdown } from '@/components/collections/dropdown/scale-dropdown';
import { AccordionDropdown } from '@/components/collections/dropdown/accordion-dropdown';
import { StaggeredDropdown } from '@/components/collections/dropdown/staggered-dropdown';
import { TypewriterDropdown } from '@/components/collections/dropdown/typewriter-dropdown';
import {
	Dropdown,
	DropdownContent,
	DropdownAction,
	DropdownItem,
	DropdownDivider,
} from '@/components/primitive/dropdown';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface DropdownCollectionProps {
	//
}

export const DropdownCollection: React.FC<DropdownCollectionProps> = () => {
	const variant: ButtonVariant = 'secondary';
	const [placement, setPlacement] = useLocalStorage<Placement>('dropdown', 'left-center');

	return (
		<Gallery title='Dropdown collections' description='A collection of button dropdown components.'>
			<Showcase label='Plain dropdown with button click'>
				<Dropdown>
					<Button variant={variant}>
						<span>Dropdown</span>
						<ChevronDown size={16} />
					</Button>
					<DropdownContent>
						<DropdownDemo />
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
						<DropdownDemo />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with label hover'>
				<Dropdown variant='hover'>
					<label className='text-foreground link-accent cursor-pointer'>Dropdown</label>
					<DropdownContent placement='bottom-center'>
						<DropdownDemo />
					</DropdownContent>
				</Dropdown>
			</Showcase>

			<Showcase label='Plain dropdown with avatar hover'>
				<Dropdown variant='hover'>
					<Avatar src='https://picsum.photos/seed/img1/400/300' alt='Avatar' />
					<DropdownContent placement='bottom-center'>
						<DropdownItem label='Edit data' />
						<DropdownDivider />
						<DropdownAction label='Profile' icon={User} />
						<DropdownAction label='Privacy' icon={TriangleAlert} />
						<DropdownAction label='Settings' icon={Settings} />
						<DropdownAction label='Logout' icon={LogOut} variant='destructive' />
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
						<DropdownDemo />
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
						<DropdownDemo />
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
						<DropdownDemo />
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
						<DropdownDemo />
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
						<DropdownDemo />
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
						<DropdownDemo />
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
						<DropdownDemo />
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
						<DropdownDemo />
					</AccordionDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Dropdown with menu content'>
				<Dropdown>
					<Button variant={variant}>
						<Menu size={16} />
						<span>Open Menu</span>
					</Button>
					<BlurDropdown placement='right-center' className='min-w-60'>
						<MenuItem position='end' label='Profile' icon={User} />
						<MenuItem position='end' label='Account Settings' icon={Settings} />
						<MenuItem label='Files'>
							<MenuItem position='end' label='Recent' icon={File} />
							<MenuItem position='end' label='Starred' icon={ArrowUpRight} />
							<MenuItem position='end' label='Shared' icon={Share} />
						</MenuItem>
						<MenuItem position='end' label='Notifications' icon={TriangleAlert} />
						<DropdownDivider />
						<MenuItem position='end' label='Logout' icon={LogOut} variant='destructive' />
					</BlurDropdown>
				</Dropdown>
			</Showcase>

			<Showcase label='Accordion with controller placements' className='col-span-2'>
				<div className='flex items-center gap-4'>
					<Select value={placement} onChange={(e) => setPlacement(e.target.value as Placement)}>
						{PLACEMENTS.map((placement) => (
							<option key={placement.id} value={placement.id}>
								{placement.label}
							</option>
						))}
					</Select>
					<Dropdown>
						<Button variant={variant}>
							<span>Accordion</span>
							<ChevronDown size={16} />
						</Button>
						<FadeDropdown placement={placement}>
							<DropdownDemo />
						</FadeDropdown>
					</Dropdown>
				</div>
			</Showcase>
		</Gallery>
	);
};
