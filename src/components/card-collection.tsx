import * as React from 'react';
import { Trash, TriangleAlert, X } from 'lucide-react';

import { Card } from '@/components/primitive/card';
import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { CardHeader } from '@/components/primitive/card-header';
import { CardContent } from '@/components/primitive/card-content';
import { CardFooter } from '@/components/primitive/card-footer';
import { TiltButton } from '@/components/collections/button/tilt-button';
import { ScrambleButton } from '@/components/collections/button/scramble-button';

interface CardCollectionProps {
	//
}

export const CardCollection: React.FC<CardCollectionProps> = () => {
	return (
		<Gallery title='Card' description='A collection of button card components.'>
			<Showcase label='Example card' className='col-span-full'>
				<Card className='max-w-md'>
					<CardHeader title='Confirm delete' onClose={() => console.log('close')} />
					<CardContent className='text-center flex flex-col items-center gap-2'>
						<TriangleAlert size={32} />
						<p className='text-zinc-400'>
							Are you sure you want to delete this item?, this action is irreversible and cannot be
							undone, make sure you have a backup of your data.
						</p>
					</CardContent>
					<CardFooter>
						<TiltButton
							icon={X}
							variant='ghost'
							position='start'
							label='Cancel action'
							className='rounded-xl'
						/>
						<ScrambleButton
							icon={Trash}
							position='start'
							label='Delete content'
							className='rounded-xl'
							variant='destructive'
						/>
					</CardFooter>
				</Card>
			</Showcase>
		</Gallery>
	);
};
