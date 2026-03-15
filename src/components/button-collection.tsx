import * as React from 'react';
import {
	ArrowUpRight,
	Database,
	Download,
	FlaskConical,
	Mail,
	ShoppingBag,
	Zap,
	Activity,
	MessageCircle,
	UserPlus,
} from 'lucide-react';

import { Showcase } from '@/components/primitive/showcase';
import { Gallery } from '@/components/primitive/gallery';
import { FlyinButton } from '@/components/collections/button/flyin-button';
import { TiltIconButton } from '@/components/collections/button/tilt-button';
import { KineticButton } from '@/components/collections/button/kinetic-button';
import { RollingButton } from '@/components/collections/button/rolling-button';
import { MagneticButton } from '@/components/collections/button/magnetic-button';
import { ScrambleButton } from '@/components/collections/button/scramble-button';

interface ButtonCollectionProps {
	//
}

export const ButtonCollection: React.FC<ButtonCollectionProps> = () => {
	return (
		<Gallery title='Buttons' description='A collection of button components.'>
			<Showcase label='Rolling button component'>
				<RollingButton label='Get started' hover='Read more' direction='right' variant='primary' />
			</Showcase>

			<Showcase label='Rolling button component reversed'>
				<RollingButton label='Read more' hover='Get started' direction='left' variant='primary' />
			</Showcase>

			<Showcase label='Slides in icons component start'>
				<FlyinButton label='Download' icon={Download} position='start' variant='primary' />
			</Showcase>

			<Showcase label='Slides in icons component end'>
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

			<Showcase label='Scramble button with icon start'>
				<ScrambleButton label='Contact us' icon={MessageCircle} position='start' variant='primary' />
			</Showcase>

			<Showcase label='Scramble button with icon end'>
				<ScrambleButton label='Add user' icon={UserPlus} position='end' variant='primary' />
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

			<Showcase label='Kinetic button'>
				<KineticButton label='Bounce' variant='primary' />
			</Showcase>

			<Showcase label='Kinetic button with icon start'>
				<KineticButton label='Get moving' icon={Zap} position='start' variant='primary' />
			</Showcase>

			<Showcase label='Kinetic button with icon end'>
				<KineticButton label='Lets go' icon={Activity} position='end' variant='primary' />
			</Showcase>
		</Gallery>
	);
};
