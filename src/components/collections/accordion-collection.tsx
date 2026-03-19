import { MessageCircle, Settings, User } from 'lucide-react';

import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { Accordion, AccordionItem } from '@/components/primitive/accordion';
import { FormDemo } from '../demo/shared';

export const AccordionCollection = () => {
	return (
		<Gallery
			className='md:grid-cols-1'
			title='Accordion collection'
			description='Vertically collapsing content sections.'>
			<Showcase label='Single accordion type with no initial value'>
				<Accordion type='single'>
					<AccordionItem value='item-1' title='What is React?'>
						React is a JavaScript library for building user interfaces. It was developed by Facebook
						and is now maintained by Meta and a community of developers.
					</AccordionItem>
					<AccordionItem value='item-2' title='What is TypeScript?'>
						TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds
						optional static typing and class-based OOP to the language.
					</AccordionItem>
					<AccordionItem value='item-3' title='What is Tailwind CSS?'>
						Tailwind CSS is a utility-first CSS framework for rapidly building custom user
						interfaces. It provides low-level utility classes that let you build completely custom
						designs.
					</AccordionItem>
				</Accordion>
			</Showcase>

			<Showcase label='Single accordion type with initial value'>
				<Accordion type='single' initial='item-2'>
					<AccordionItem value='item-1' title='What is React?'>
						React is a JavaScript library for building user interfaces. It was developed by Facebook
						and is now maintained by Meta and a community of developers.
					</AccordionItem>
					<AccordionItem value='item-2' title='What is TypeScript?'>
						TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds
						optional static typing and class-based OOP to the language.
					</AccordionItem>
					<AccordionItem value='item-3' title='What is Tailwind CSS?'>
						Tailwind CSS is a utility-first CSS framework for rapidly building custom user
						interfaces. It provides low-level utility classes that let you build completely custom
						designs.
					</AccordionItem>
				</Accordion>
			</Showcase>

			<Showcase label='Single accordion type with disabled item'>
				<Accordion type='single' initial='item-2'>
					<AccordionItem value='item-1' title='What is React?'>
						React is a JavaScript library for building user interfaces. It was developed by Facebook
						and is now maintained by Meta and a community of developers.
					</AccordionItem>
					<AccordionItem value='item-2' title='What is TypeScript?'>
						TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds
						optional static typing and class-based OOP to the language.
					</AccordionItem>
					<AccordionItem value='item-3' title='What is Tailwind CSS?' disabled>
						Tailwind CSS is a utility-first CSS framework for rapidly building custom user
						interfaces. It provides low-level utility classes that let you build completely custom
						designs.
					</AccordionItem>
				</Accordion>
			</Showcase>

			<Showcase label='Multiple accordion type'>
				<Accordion type='multiple' initial='item-1'>
					<AccordionItem value='item-1' title='Getting started'>
						To get started, install the package via npm or yarn. Then import the components you need
						and start building your UI.
					</AccordionItem>
					<AccordionItem value='item-2' title='Installation'>
						Run <code>npm install fourteen-ui</code> to install the package. Make sure you have
						React 18+ and TypeScript installed.
					</AccordionItem>
					<AccordionItem value='item-3' title='Usage'>
						Import the components from the package and use them in your React components. All
						components are fully typed and accessible.
					</AccordionItem>
				</Accordion>
			</Showcase>

			<Showcase label='Accordion with icon'>
				<Accordion type='single' initial='icon-1'>
					<AccordionItem value='icon-1' title='Profile' icon={User}>
						Update your profile information, profile picture, and personal details.
					</AccordionItem>
					<AccordionItem value='icon-2' title='Settings' icon={Settings}>
						Configure application settings, preferences, and customization options.
					</AccordionItem>
					<AccordionItem value='icon-3' title='Messages' icon={MessageCircle}>
						View and manage your messages, notifications, and communication history.
					</AccordionItem>
				</Accordion>
			</Showcase>

			<Showcase label='Accordion with complex content'>
				<Accordion type='multiple'>
					<AccordionItem value='list' title='Template string'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, unde magnam soluta
						ratione esse mollitia, quibusdam cumque repudiandae suscipit velit labore! Unde
						veritatis dignissimos soluta voluptas culpa voluptate nostrum expedita!
					</AccordionItem>
					<AccordionItem value='form' title='Contact form'>
						<FormDemo />
					</AccordionItem>
				</Accordion>
			</Showcase>
		</Gallery>
	);
};
