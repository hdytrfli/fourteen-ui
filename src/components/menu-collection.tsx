import * as React from 'react';
import {
	Archive,
	ArrowUpRight,
	Box,
	Copy,
	File,
	Folder,
	Image,
	LogOut,
	Mail,
	Pencil,
	Settings,
	Share,
	Trash,
	TriangleAlert,
	User,
	Video,
} from 'lucide-react';

import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';

import { Menu } from '@/components/primitive/menu';
import { MenuItem } from '@/components/primitive/menu-item';
import { FadeMenuItem } from '@/components/collections/menu/fade-menu';
import { ScaleMenuItem } from '@/components/collections/menu/scale-menu';
import { SlideMenuItem } from '@/components/collections/menu/slide-menu';
import { StaggerMenuItem } from '@/components/collections/menu/stagger-menu';

interface MenuCollectionProps {
	//
}

export const MenuCollection: React.FC<MenuCollectionProps> = () => {
	return (
		<Gallery
			title='Menu'
			className='md:grid-cols-2'
			description='A collection of menu components with submenu support.'>
			<Showcase className='col-span-full' label='Basic menu'>
				<Menu className='max-w-60 bg-background rounded-xl p-1'>
					<MenuItem label='Edit' icon={Pencil} />
					<MenuItem label='Duplicate' icon={Copy} />
					<MenuItem label='Delete' icon={Trash} variant='destructive' />
				</Menu>
			</Showcase>

			<Showcase className='col-span-full' label='Menu with single submenu'>
				<Menu className='max-w-60 bg-background rounded-xl p-1'>
					<MenuItem label='Inbox' icon={Mail} />
					<MenuItem label='Files' icon={Folder}>
						<MenuItem label='Documents' icon={File} />
						<MenuItem label='Images' icon={Image} />
						<MenuItem label='Videos' icon={Video} />
					</MenuItem>
					<MenuItem label='Settings' icon={Settings} />
				</Menu>
			</Showcase>

			<Showcase className='col-span-full' label='Menu with multiple submenus'>
				<Menu className='max-w-60 bg-background rounded-xl p-1'>
					<MenuItem label='Dashboard' icon={Box} />
					<MenuItem label='Projects' icon={Folder}>
						<MenuItem label='Active' icon={ArrowUpRight} />
						<MenuItem label='Archived' icon={Archive} />
					</MenuItem>
					<MenuItem label='Media' icon={Image}>
						<MenuItem label='Photos' icon={Image} />
						<MenuItem label='Videos' icon={Video} />
					</MenuItem>
					<MenuItem label='Trash' icon={Trash} variant='destructive' />
				</Menu>
			</Showcase>

			<Showcase className='col-span-full' label='Nested submenu with multiple levels'>
				<Menu className='max-w-60 bg-background rounded-xl p-1'>
					<MenuItem label='Root Item 1' icon={File} />
					<MenuItem label='Root Item 2' icon={Folder}>
						<MenuItem label='Child Item 1' icon={File} />
						<MenuItem label='Child Item 2' icon={Folder}>
							<MenuItem label='Grandchild 1' icon={File} />
							<MenuItem label='Grandchild 2' icon={File} />
						</MenuItem>
						<MenuItem label='Child Item 3' icon={File} />
					</MenuItem>
					<MenuItem label='Root Item 3' icon={Settings} />
				</Menu>
			</Showcase>

			<Showcase className='col-span-full' label='Menu with icons at end position'>
				<Menu className='max-w-60 bg-background rounded-xl p-1'>
					<MenuItem label='Edit' icon={Pencil} position='end' />
					<MenuItem label='Share' icon={Share} position='end' />
					<MenuItem label='Delete' icon={Trash} variant='destructive' position='end' />
				</Menu>
			</Showcase>

			<Showcase className='col-span-full' label='Complex application menu'>
				<Menu className='max-w-60 bg-background rounded-xl p-1'>
					<MenuItem label='Profile' icon={User} />
					<MenuItem label='Account Settings' icon={Settings} />
					<MenuItem label='Files' icon={Folder}>
						<MenuItem label='Recent' icon={File} />
						<MenuItem label='Starred' icon={ArrowUpRight} />
						<MenuItem label='Shared' icon={Share} />
					</MenuItem>
					<MenuItem label='Notifications' icon={TriangleAlert} />
					<hr className='border-b border-border border-dashed my-1' />
					<MenuItem label='Logout' icon={LogOut} variant='destructive' />
				</Menu>
			</Showcase>

			<Showcase className='col-span-full' label='Fade menu - submenu animation'>
				<Menu className='max-w-60 bg-background rounded-xl p-1'>
					<FadeMenuItem label='Inbox' icon={Mail} />
					<FadeMenuItem label='Files' icon={Folder}>
						<FadeMenuItem label='Documents' icon={File} />
						<FadeMenuItem label='Images' icon={Image} />
						<FadeMenuItem label='Videos' icon={Video} />
					</FadeMenuItem>
					<FadeMenuItem label='Settings' icon={Settings} />
				</Menu>
			</Showcase>

			<Showcase className='col-span-full' label='Scale menu - submenu animation'>
				<Menu className='max-w-60 bg-background rounded-xl p-1'>
					<ScaleMenuItem label='Inbox' icon={Mail} />
					<ScaleMenuItem label='Files' icon={Folder}>
						<ScaleMenuItem label='Documents' icon={File} />
						<ScaleMenuItem label='Images' icon={Image} />
						<ScaleMenuItem label='Videos' icon={Video} />
					</ScaleMenuItem>
					<ScaleMenuItem label='Settings' icon={Settings} />
				</Menu>
			</Showcase>

			<Showcase className='col-span-full' label='Slide menu - submenu animation'>
				<Menu className='max-w-60 bg-background rounded-xl p-1'>
					<SlideMenuItem label='Inbox' icon={Mail} />
					<SlideMenuItem label='Files' icon={Folder}>
						<SlideMenuItem label='Documents' icon={File} />
						<SlideMenuItem label='Images' icon={Image} />
						<SlideMenuItem label='Videos' icon={Video} />
					</SlideMenuItem>
					<SlideMenuItem label='Settings' icon={Settings} />
				</Menu>
			</Showcase>

			<Showcase className='col-span-full' label='Stagger menu - submenu animation'>
				<Menu className='max-w-60 bg-background rounded-xl p-1'>
					<StaggerMenuItem label='Inbox' icon={Mail} />
					<StaggerMenuItem label='Files' icon={Folder}>
						<StaggerMenuItem label='Documents' icon={File} />
						<StaggerMenuItem label='Images' icon={Image} />
						<StaggerMenuItem label='Videos' icon={Video} />
						<StaggerMenuItem label='Audio' icon={Archive} />
					</StaggerMenuItem>
					<StaggerMenuItem label='Settings' icon={Settings} />
				</Menu>
			</Showcase>
		</Gallery>
	);
};
