import * as React from 'react';
import { FastForward, Plane } from 'lucide-react';

import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { FlyinButton } from '@/components/collections/button/flyin-button';
import { RollingButton } from '@/components/collections/button/rolling-button';
import { KineticButton } from './collections/button/kinetic-button';

interface VariantCollectionProps {
	//
}

export const VariantCollection: React.FC<VariantCollectionProps> = () => {
	return (
		<Gallery title='Variant' description='A collection of button variant components.'>
			<Showcase label='Primary variant button'>
				<RollingButton label='Primary' hover='Primary' variant='primary' />
			</Showcase>

			<Showcase label='Secondary variant button'>
				<FlyinButton label='Secondary' icon={FastForward} position='start' variant='secondary' />
			</Showcase>

			<Showcase label='Accent variant button'>
				<KineticButton label='Accent' icon={Plane} position='start' variant='accent' />
			</Showcase>
		</Gallery>
	);
};
