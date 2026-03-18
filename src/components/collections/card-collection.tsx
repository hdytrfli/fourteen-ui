import * as React from 'react';
import { Trash, TriangleAlert, X, Github, Globe, ArrowUpRight, Check } from 'lucide-react';

import { Card } from '@/components/primitive/card';
import { Label } from '@/components/primitive/label';
import { Field } from '@/components/primitive/field';
import { Input } from '@/components/primitive/input';
import { Select } from '@/components/primitive/select';
import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { CardHeader } from '@/components/primitive/card-header';
import { CardContent } from '@/components/primitive/card-content';
import { CardFooter } from '@/components/primitive/card-footer';
import { ScrambleButton } from '@/components/collections/button/scramble-button';
import { RollingButton } from '@/components/collections/button/rolling-button';
import { SwapButton } from '@/components/collections/button/swap-button';
import { FormDemo } from '@/components/demo/shared';
import { Textarea } from '@/components/primitive/textarea';
import { Switch } from '../primitive/switch';

interface CardCollectionProps {
	//
}

export const CardCollection: React.FC<CardCollectionProps> = () => {
	return (
		<Gallery title='Card collections' description='A collection of button card components.'>
			<Showcase label='Example card' className='col-span-full'>
				<Card className='max-w-md'>
					<CardHeader title='Confirm delete' onClose={() => console.log('close')} />
					<CardContent className='text-center flex flex-col items-center gap-2'>
						<TriangleAlert size={32} />
						<p className='text-text'>
							Are you sure you want to delete this item?, this action is irreversible and cannot be
							undone, make sure you have a backup of your data.
						</p>
					</CardContent>
					<CardFooter>
						<ScrambleButton icon={X} variant='ghost' label='Dismiss' className='rounded-xl' />
						<RollingButton
							icon={Trash}
							label='Delete'
							className='rounded-xl'
							variant='destructive'
						/>
					</CardFooter>
				</Card>
			</Showcase>

			<Showcase label='Update user card' className='col-span-full'>
				<Card className='max-w-xl'>
					<CardHeader title='Update user card' />
					<CardContent className='grid gap-4'>
						<FormDemo />
					</CardContent>
					<CardFooter>
						<ScrambleButton icon={X} label='Dismiss' variant='ghost' className='rounded-xl' />
						<SwapButton label='Authorize changes' icon={Check} variant='primary' />
					</CardFooter>
				</Card>
			</Showcase>

			<Showcase label='Form with error state' className='col-span-full'>
				<Card className='max-w-lg'>
					<CardHeader title='Repository setting' />
					<CardContent className='grid gap-4'>
						<form className='grid gap-4'>
							<Field
								error='Repository title is required'
								description='Please enter a valid repository title'>
								<Label htmlFor='repo-title'>Repository</Label>
								<Input
									type='text'
									id='repo-title'
									placeholder='Enter repository title'
									icon={Github}
									invalid
								/>
							</Field>

							<Field description='Please enter a valid repository description'>
								<Label htmlFor='repo-desc'>Repository type</Label>
								<Select id='repo-desc' icon={Globe} defaultValue=''>
									<option value='' disabled>
										Select repository type
									</option>
									<option value='public'>Public</option>
									<option value='private'>Private</option>
									<option value='internal'>Internal</option>
								</Select>
							</Field>

							<Field description='Please enter a valid repository description'>
								<Label htmlFor='repo-desc'>Repository type</Label>
								<Textarea id='repo-desc' placeholder='Enter repository description' />
							</Field>

							<Field description='Include a readme file in the repository'>
								<div className='flex items-center justify-between'>
									<Label htmlFor='readme'>Add readme file to repository</Label>
									<Switch id='readme' defaultChecked />
								</div>
							</Field>
						</form>
					</CardContent>
					<CardFooter>
						<ScrambleButton icon={X} label='Dismiss' variant='ghost' className='rounded-xl' />
						<SwapButton
							position='end'
							variant='primary'
							icon={ArrowUpRight}
							label='Save changes'
							className='rounded-xl'
						/>
					</CardFooter>
				</Card>
			</Showcase>
		</Gallery>
	);
};
