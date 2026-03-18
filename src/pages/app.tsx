import * as React from 'react';
import { Link } from 'react-router';

import { Navigation } from '@/components/navigation';
import { CardCollection } from '@/components/collections/card-collection';
import { ModalCollection } from '@/components/collections/modal-collection';
import { ButtonCollection } from '@/components/collections/button-collection';
import { VariantCollection } from '@/components/collections/variant-collection';
import { DropdownCollection } from '@/components/collections/dropdown-collection';
import { TooltipCollection } from '@/components/collections/tooltip-collection';
import { MenuCollection } from '@/components/collections/menu-collection';
import { InputCollection } from '@/components/collections/input-collection';
import { SelectCollection } from '@/components/collections/select-collection';
import { SwitchCollection } from '@/components/collections/switch-collection';
import { TextareaCollection } from '@/components/collections/textarea-collection';

export default function App(): React.JSX.Element {
	return (
		<React.Fragment>
			<header className='grid gap-2'>
				<div className='flex items-center justify-between'>
					<h1 className='text-5xl font-heading'>Idea collections</h1>
					<Navigation />
				</div>

				<p className='max-w-2xl'>
					Collections of ideas for your next project. Built with{' '}
					<Link to='https://reactjs.org/'>React</Link> and{' '}
					<Link to='https://tailwindcss.com/'>Tailwind CSS</Link> and animated using{' '}
					<Link to='https://greensock.com/'>GreenSock</Link> animations, this stack is purposely
					used to make the components easily trasnferable to other frameworks.
				</p>
			</header>

			<div className='grid gap-20'>
				<ButtonCollection />
				<VariantCollection />
				<InputCollection />
				<SelectCollection />
				<SwitchCollection />
				<TextareaCollection />
				<TooltipCollection />
				<DropdownCollection />
				<CardCollection />
				<ModalCollection />
				<MenuCollection />
			</div>
		</React.Fragment>
	);
}
