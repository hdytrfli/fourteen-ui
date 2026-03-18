import * as React from 'react';
import { FastForward, Info, Plane, Send, Trash } from 'lucide-react';

import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { FlyinButton } from '@/components/collections/button/flyin-button';
import { RollingButton } from '@/components/collections/button/rolling-button';
import { KineticButton } from '@/components/collections/button/kinetic-button';
import { MagneticButton } from '@/components/collections/button/magnetic-button';
import { ScrambleButton } from '@/components/collections/button/scramble-button';

interface VariantCollectionProps {
	//
}

export const VariantCollection: React.FC<VariantCollectionProps> = () => {
	return (
		<Gallery title='Variant' description='A collection of button variant components.'>
			<Showcase label='Primary variant button'>
				<RollingButton label='Primary' icon={Send} variant='primary' />
			</Showcase>

			<Showcase label='Secondary variant button'>
				<FlyinButton label='Secondary' icon={FastForward} variant='secondary' />
			</Showcase>

			<Showcase label='Accent variant button'>
				<KineticButton label='Accent' icon={Plane} variant='accent' />
			</Showcase>

			<Showcase label='Destructive variant button'>
				<ScrambleButton label='Destructive' icon={Trash} variant='destructive' />
			</Showcase>

			<Showcase label='Ghost variant button'>
				<MagneticButton label='Ghost' icon={Info} variant='ghost' />
			</Showcase>
		</Gallery>
	);
};
