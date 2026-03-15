import * as React from 'react';
import { ArrowUpRight, Database, Download, FlaskConical, Mail, ShoppingBag } from 'lucide-react';

import { Showcase } from '@/components/primitive/showcase';
import { Gallery } from '@/components/primitive/gallery';
import { ScrambleButton } from './collections/button/scramble-button';
import { FlyinButton } from '@/components/collections/button/flyin-button';
import { TiltIconButton } from '@/components/collections/button/tilt-button';
import { RollingButton } from '@/components/collections/button/rolling-button';
import { MagneticButton } from '@/components/collections/button/magnetic-button';

interface ButtonCollectionProps {
	//
}

export const ButtonCollection: React.FC<ButtonCollectionProps> = () => {
	return (
		<Gallery title='Buttons' description='A collection of button components.'>
			<Showcase label='Rolling button component'>
				<RollingButton label='Get started' hover='Read more' variant='primary' />
			</Showcase>

			<Showcase label='Animated icons component start'>
				<FlyinButton label='Download' icon={Download} position='start' variant='primary' />
			</Showcase>

			<Showcase label='Animated icons component end'>
				<FlyinButton label='Explore now' icon={ArrowUpRight} position='end' variant='primary' />
			</Showcase>

			<Showcase label='Tilt icon button start'>
				<TiltIconButton label='Enable feature' icon={FlaskConical} position='start' variant='primary' />
			</Showcase>

			<Showcase label='Tilt icon button end'>
				<TiltIconButton label='Connect database' icon={Database} position='end' variant='primary' />
			</Showcase>

			<Showcase label='Scramble button'>
				<ScrambleButton label='Get started' variant='primary' />
			</Showcase>

			<Showcase label='Magnetic button'>
				<MagneticButton label='Get started' variant='primary' />
			</Showcase>

			<Showcase label='Magnetic button with icon start'>
				<MagneticButton label='Checkout' icon={ShoppingBag} position='start' variant='primary' />
			</Showcase>

			<Showcase label='Magnetic button with icon end'>
				<MagneticButton label='Contact Us' icon={Mail} position='end' variant='primary' />
			</Showcase>
		</Gallery>
	);
};
