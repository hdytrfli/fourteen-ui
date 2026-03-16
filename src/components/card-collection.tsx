import * as React from 'react';
import { ArrowUpRight, Trash, TriangleAlert, X } from 'lucide-react';

import { cn } from '@/libs/utils';
import { Card } from '@/components/primitive/card';
import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { CardHeader } from '@/components/primitive/card-header';
import { CardContent } from '@/components/primitive/card-content';
import { CardFooter } from '@/components/primitive/card-footer';
import { TiltButton } from '@/components/collections/button/tilt-button';
import { ScrambleButton } from '@/components/collections/button/scramble-button';
import { KineticButton } from '@/components/collections/button/kinetic-button';

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
							label='Cancel'
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

			<Showcase label='Update user card' className='col-span-full'>
				<Card className='max-w-lg'>
					<CardHeader title='Update user card' />
					<CardContent className='grid gap-4'>
						<p>
							Hello, John Doe. This is your account page. You can manage your account settings here
							or delete your account if you want.
						</p>
						<form className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm mb-1 font-medium'>Username</label>
								<input
									type='text'
									placeholder='Enter your username'
									className={cn(
										'bg-border w-full',
										'px-4 h-12 rounded-xl',
										'focus-visible:ring-2 focus-visible:ring-accent outline-none'
									)}
								/>
							</div>

							<div>
								<label className='block text-sm mb-1 font-medium'>Password</label>
								<input
									type='password'
									placeholder='Enter your password'
									className={cn(
										'bg-border w-full',
										'px-4 h-12 rounded-xl',
										'focus-visible:ring-2 focus-visible:ring-accent outline-none'
									)}
								/>
							</div>

							<div className='col-span-full'>
								<label className='block text-sm mb-1 font-medium'>Email</label>
								<input
									type='email'
									placeholder='Enter your email'
									className={cn(
										'bg-border w-full',
										'px-4 h-12 rounded-xl',
										'focus-visible:ring-2 focus-visible:ring-accent outline-none'
									)}
								/>
							</div>
						</form>
					</CardContent>
					<CardFooter>
						<TiltButton
							icon={X}
							variant='ghost'
							position='start'
							label='Cancel update'
							className='rounded-xl'
						/>
						<KineticButton
							position='end'
							variant='primary'
							icon={ArrowUpRight}
							label='Update content'
							className='rounded-xl'
						/>
					</CardFooter>
				</Card>
			</Showcase>
		</Gallery>
	);
};
