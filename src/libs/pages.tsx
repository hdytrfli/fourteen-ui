import { ButtonCollection } from '@/components/button-collection';
import { VariantCollection } from '@/components/variant-collection';
import { DropdownCollection } from '@/components/dropdown-collection';
import { ModalCollection } from '@/components/modal-collection';
import { CardCollection } from '@/components/card-collection';
import { TooltipCollection } from '@/components/tooltip-collection';
import { MenuCollection } from '@/components/menu-collection';

export const PAGES = [
	{
		path: '/buttons',
		title: 'Button collections',
		desciption:
			'Animated button components with micro-interactions including tilt, scramble, and fly-in effects.',
		component: ButtonCollection,
	},
	{
		path: '/variants',
		title: 'Variant collections',
		desciption: 'Button variant components showcasing different styles, sizes, and states.',
		component: VariantCollection,
	},
	{
		path: '/dropdowns',
		title: 'Dropdown collections',
		desciption: 'Dropdown menus with smooth animations and keyboard accessibility.',
		component: DropdownCollection,
	},
	{
		path: '/menus',
		title: 'Menu collections',
		desciption: 'Vertical tree-style menu components with expandable submenus.',
		component: MenuCollection,
	},
	{
		path: '/modal',
		title: 'Modal collections',
		desciption:
			'Modal dialogs with various entrance animations including slide, scale, rotate, CRT, elastic, and newspaper effects.',
		component: ModalCollection,
	},
	{
		path: '/cards',
		title: 'Card collections',
		desciption: 'Card components with hover effects, shadows, and interactive elements.',
		component: CardCollection,
	},
	{
		path: '/tooltips',
		title: 'Tooltip collections',
		desciption: 'Tooltip components with fade, scale, and blur animation variants.',
		component: TooltipCollection,
	},
];
