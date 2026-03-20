import * as React from 'react';
import { Link } from 'react-router';
import type { ClassValue } from 'clsx';

import { cn } from '@/libs/utils';
import { Navbar } from '@/components/navbar';
import type { TOCPosition } from '@/libs/types';
import { useConfig } from '@/contexts/config-context';
import { ContentTable } from '@/components/primitive/content-table';
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
import { AccordionCollection } from '@/components/collections/accordion-collection';

const positions: Record<TOCPosition, ClassValue> = {
	start: 'left-8',
	end: 'right-8',
};

export default function App(): React.JSX.Element {
	const { config } = useConfig();
	const ref = React.useRef<HTMLDivElement>(null);
	const position = config.position ? 'end' : 'start';

	return (
		<React.Fragment>
			{config.toc && (
				<div className={cn('hidden 2xl:block fixed top-1/2 -translate-y-1/2', positions[position])}>
					<ContentTable container={ref} selector='h1, h2, h3' position={position} />
				</div>
			)}

			<Navbar title='Idea collections'>
				Collections of ideas for your next project. Built with{' '}
				<Link to='https://reactjs.org/'>React</Link> and{' '}
				<Link to='https://tailwindcss.com/'>Tailwind CSS</Link> and animated using{' '}
				<Link to='https://greensock.com/'>GreenSock</Link> animations, this stack is purposely used
				to make the components easily trasnferable to other frameworks.
			</Navbar>

			<div ref={ref} className='grid gap-20'>
				<ButtonCollection />
				<VariantCollection />
				<InputCollection />
				<SelectCollection />
				<SwitchCollection />
				<TextareaCollection />
				<AccordionCollection />
				<TooltipCollection />
				<DropdownCollection />
				<CardCollection />
				<ModalCollection />
				<MenuCollection />
			</div>
		</React.Fragment>
	);
}
