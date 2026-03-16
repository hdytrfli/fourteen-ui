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

import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import type { ButtonVariant } from '@/components/primitive/button';
import { FlyinButton } from '@/components/collections/button/flyin-button';
import { TiltButton } from '@/components/collections/button/tilt-button';
import { KineticButton } from '@/components/collections/button/kinetic-button';
import { RollingButton } from '@/components/collections/button/rolling-button';
import { MagneticButton } from '@/components/collections/button/magnetic-button';
import { ScrambleButton } from '@/components/collections/button/scramble-button';
import { SwapButton } from '@/components/collections/button/swap-button';

interface ButtonCollectionProps {
	//
}

export const ButtonCollection: React.FC<ButtonCollectionProps> = () => {
	const variant: ButtonVariant = 'secondary';

	return (
		<Gallery title='Buttons' description='A collection of button components.'>
			<Showcase label='Rolling button component'>
				<RollingButton label='Get started' direction='right' variant={variant} />
			</Showcase>

			<Showcase label='Rolling button component reversed'>
				<RollingButton label='Read more' direction='left' variant={variant} />
			</Showcase>

			<Showcase label='Rolling button with icon start'>
				<RollingButton
					label='Get started'
					icon={ArrowUpRight}
					position='start'
					direction='right'
					variant={variant}
				/>
			</Showcase>

			<Showcase label='Rolling button with icon end'>
				<RollingButton
					label='Read more'
					icon={ArrowUpRight}
					position='end'
					direction='left'
					variant={variant}
				/>
			</Showcase>

			<Showcase label='Swap button component'>
				<SwapButton label='Subscribe' variant={variant} />
			</Showcase>

			<Showcase label='Swap button with icon start'>
				<SwapButton label='Subscribe' icon={Download} position='start' variant={variant} />
			</Showcase>

			<Showcase label='Swap button with icon end'>
				<SwapButton label='Subscribe' icon={Download} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Slides in icons component start'>
				<FlyinButton label='Download' icon={Download} position='start' variant={variant} />
			</Showcase>

			<Showcase label='Slides in icons component end'>
				<FlyinButton label='Explore now' icon={ArrowUpRight} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Tilt icon button start'>
				<TiltButton label='Enable feature' icon={FlaskConical} position='start' variant={variant} />
			</Showcase>

			<Showcase label='Tilt icon button end'>
				<TiltButton label='Connect database' icon={Database} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Scramble button'>
				<ScrambleButton label='Get started' variant={variant} />
			</Showcase>

			<Showcase label='Scramble button with icon start'>
				<ScrambleButton
					label='Contact us'
					icon={MessageCircle}
					position='start'
					variant={variant}
				/>
			</Showcase>

			<Showcase label='Scramble button with icon end'>
				<ScrambleButton label='Add user' icon={UserPlus} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Magnetic button'>
				<MagneticButton label='Get started' variant={variant} />
			</Showcase>

			<Showcase label='Magnetic button with icon start'>
				<MagneticButton label='Checkout' icon={ShoppingBag} position='start' variant={variant} />
			</Showcase>

			<Showcase label='Magnetic button with icon end'>
				<MagneticButton label='Contact Us' icon={Mail} position='end' variant={variant} />
			</Showcase>

			<Showcase label='Kinetic button'>
				<KineticButton label='Bounce' variant={variant} />
			</Showcase>

			<Showcase label='Kinetic button with icon start'>
				<KineticButton label='Get moving' icon={Zap} position='start' variant={variant} />
			</Showcase>

			<Showcase label='Kinetic button with icon end'>
				<KineticButton label='Lets go' icon={Activity} position='end' variant={variant} />
			</Showcase>
		</Gallery>
	);
};
