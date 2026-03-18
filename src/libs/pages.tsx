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
	{
		path: '/inputs',
		title: 'Input collections',
		desciption: 'Input components with icon support and grouped input variants.',
		component: InputCollection,
	},
	{
		path: '/select',
		title: 'Select collections',
		desciption: 'Native select components with icon support and error states.',
		component: SelectCollection,
	},
	{
		path: '/switch',
		title: 'Switch collections',
		desciption:
			'Switch toggle components for boolean inputs with smooth transitions and animations.',
		component: SwitchCollection,
	},
	{
		path: '/textarea',
		title: 'Textarea collections',
		desciption: 'Textarea components for multi-line text input with icon support.',
		component: TextareaCollection,
	},
];
