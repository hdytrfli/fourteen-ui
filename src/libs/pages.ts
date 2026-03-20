import {
	ArrowUpRight,
	Box,
	Layers,
	List,
	Menu,
	MessageCircle,
	PanelTopDashed,
	PenLine,
	PictureInPicture2,
	Power,
	ScanLine,
	type LucideIcon,
} from 'lucide-react';

import { ButtonCollection } from '@/components/collections/button-collection';
import { VariantCollection } from '@/components/collections/variant-collection';
import { DropdownCollection } from '@/components/collections/dropdown-collection';
import { ModalCollection } from '@/components/collections/modal-collection';
import { CardCollection } from '@/components/collections/card-collection';
import { TooltipCollection } from '@/components/collections/tooltip-collection';
import { MenuCollection } from '@/components/collections/menu-collection';
import { InputCollection } from '@/components/collections/input-collection';
import { SelectCollection } from '@/components/collections/select-collection';
import { SwitchCollection } from '@/components/collections/switch-collection';
import { TextareaCollection } from '@/components/collections/textarea-collection';
import { AccordionCollection } from '@/components/collections/accordion-collection';

type PageItem = {
	path: string;
	label: string;
	icon: LucideIcon;
	desciption: string;
	type: 'form' | 'other';
	component: React.ComponentType;
};

export const PAGES: PageItem[] = [
	{
		type: 'form',
		path: '/buttons',
		label: 'Button collections',
		desciption:
			'Animated button components with micro-interactions including tilt, scramble, and fly-in effects.',
		component: ButtonCollection,
		icon: ArrowUpRight,
	},
	{
		type: 'other',
		path: '/variants',
		label: 'Variant collections',
		desciption: 'Button variant components showcasing different styles, sizes, and states.',
		component: VariantCollection,
		icon: Box,
	},
	{
		type: 'form',
		path: '/inputs',
		label: 'Input collections',
		desciption: 'Input components with icon support and grouped input variants.',
		component: InputCollection,
		icon: ScanLine,
	},
	{
		type: 'form',
		path: '/select',
		label: 'Select collections',
		desciption: 'Native select components with icon support and error states.',
		component: SelectCollection,
		icon: List,
	},
	{
		type: 'form',
		path: '/switch',
		label: 'Switch collections',
		desciption:
			'Switch toggle components for boolean inputs with smooth transitions and animations.',
		component: SwitchCollection,
		icon: Power,
	},
	{
		type: 'form',
		path: '/textarea',
		label: 'Textarea collections',
		desciption: 'Textarea components for multi-line text input with icon support.',
		component: TextareaCollection,
		icon: PenLine,
	},
	{
		type: 'other',
		path: '/tooltips',
		label: 'Tooltip collections',
		desciption: 'Tooltip components with fade, scale, and blur animation variants.',
		component: TooltipCollection,
		icon: MessageCircle,
	},
	{
		type: 'other',
		path: '/dropdowns',
		label: 'Dropdown collections',
		desciption: 'Dropdown menus with smooth animations and keyboard accessibility.',
		component: DropdownCollection,
		icon: Menu,
	},
	{
		type: 'other',
		path: '/menus',
		label: 'Menu collections',
		desciption: 'Vertical tree-style menu components with expandable submenus.',
		component: MenuCollection,
		icon: Layers,
	},
	{
		type: 'other',
		path: '/cards',
		label: 'Card collections',
		desciption: 'Card components with hover effects, shadows, and interactive elements.',
		component: CardCollection,
		icon: PanelTopDashed,
	},
	{
		type: 'other',
		path: '/modal',
		label: 'Modal collections',
		desciption:
			'Modal dialogs with various entrance animations including slide, scale, rotate, CRT, elastic, and newspaper effects.',
		component: ModalCollection,
		icon: PictureInPicture2,
	},
	{
		type: 'other',
		path: '/accordion',
		label: 'Accordion collections',
		desciption: 'Accordion components with multiple item support and animations.',
		component: AccordionCollection,
		icon: List,
	},
];
