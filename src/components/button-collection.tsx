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
	ChevronRight,
	ChevronLeft,
	Play,
	Square,
	Users,
} from 'lucide-react';

import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { Button, type ButtonVariant } from '@/components/primitive/button';
import { TiltButton } from '@/components/collections/button/tilt-button';
import { SwapButton } from '@/components/collections/button/swap-button';
import { FlyinButton } from '@/components/collections/button/flyin-button';
import { KineticButton } from '@/components/collections/button/kinetic-button';
import { RollingButton } from '@/components/collections/button/rolling-button';
import { MagneticButton } from '@/components/collections/button/magnetic-button';
import { ScrambleButton } from '@/components/collections/button/scramble-button';

interface ButtonCollectionProps {
	//
}

export const ButtonCollection: React.FC<ButtonCollectionProps> = () => {
	const variant: ButtonVariant = 'secondary';

	return (
		<Gallery title='Buttons' description='A collection of button components.'>
			<Showcase label='Plain button'>
				<Button variant={variant}>
					<span>Get started</span>
				</Button>
			</Showcase>

			<Showcase label='Plain button with icon start'>
				<Button variant={variant}>
					<span>Start now</span>
					<ChevronRight size={16} />
				</Button>
			</Showcase>

			<Showcase label='Plain button with icon end'>
				<Button variant={variant}>
					<ChevronLeft size={16} />
					<span>Go back</span>
				</Button>
			</Showcase>

			<Showcase label='Rolling button component'>
				<RollingButton label='Get rolled' variant={variant} />
			</Showcase>

			<Showcase label='Rolling button component'>
				<RollingButton label='Get rolled' variant={variant} reversed />
			</Showcase>

			<Showcase label='Rolling button with icon start'>
				<RollingButton label='Play video' icon={Play} variant={variant} />
			</Showcase>

			<Showcase label='Rolling button with icon end'>
				<RollingButton label='Stop audio' icon={Square} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Swap button component'>
				<SwapButton label='Subscribe' variant={variant} />
			</Showcase>

			<Showcase label='Swap button with icon start'>
				<SwapButton label='Subscribe' icon={UserPlus} variant={variant} />
			</Showcase>

			<Showcase label='Swap button with icon end'>
				<SwapButton label='Create group' icon={Users} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Slides in icons component start'>
				<FlyinButton label='Download' icon={Download} variant={variant} />
			</Showcase>

			<Showcase label='Slides in icons component end'>
				<FlyinButton label='Explore now' icon={ArrowUpRight} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Tilt button without icon'>
				<TiltButton label='Rotate now' variant={variant} />
			</Showcase>

			<Showcase label='Tilt button with icon start'>
				<TiltButton label='Enable feature' icon={FlaskConical} variant={variant} />
			</Showcase>

			<Showcase label='Tilt button with icon end'>
				<TiltButton label='Connect database' icon={Database} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Scramble button'>
				<ScrambleButton label='Get started' variant={variant} />
			</Showcase>

			<Showcase label='Scramble button with icon start'>
				<ScrambleButton label='Contact us' icon={MessageCircle} variant={variant} />
			</Showcase>

			<Showcase label='Scramble button with icon end'>
				<ScrambleButton label='Add user' icon={UserPlus} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Magnetic button'>
				<MagneticButton label='Get started' variant={variant} />
			</Showcase>

			<Showcase label='Magnetic button with icon start'>
				<MagneticButton label='Checkout' icon={ShoppingBag} variant={variant} />
			</Showcase>

			<Showcase label='Magnetic button with icon end'>
				<MagneticButton label='Contact Us' icon={Mail} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Kinetic button'>
				<KineticButton label='Bounce' variant={variant} />
			</Showcase>

			<Showcase label='Kinetic button with icon start'>
				<KineticButton label='Get moving' icon={Zap} variant={variant} />
			</Showcase>

			<Showcase label='Kinetic button with icon end'>
				<KineticButton label='Lets go' icon={Activity} position='end' variant={variant} />
			</Showcase>
		</Gallery>
	);
};
