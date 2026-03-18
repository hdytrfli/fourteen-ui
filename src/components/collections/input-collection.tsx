import * as React from 'react';
import { Mail, Lock, User, Search, CreditCard, Calendar, Phone, Hash } from 'lucide-react';

import { Input } from '@/components/primitive/input';
import { Label } from '@/components/primitive/label';
import { Field } from '@/components/primitive/field';
import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { Group, GroupItem } from '@/components/primitive/group';
import { SwapButton } from '@/components/collections/button/swap-button';
import { Select } from '../primitive/select';

interface InputCollectionProps {
	//
}

export const InputCollection: React.FC<InputCollectionProps> = () => {
	return (
		<Gallery
			title='Input collections'
			className='md:grid-cols-2'
			description='A collection of input components with icon support and error states.'>
			<Showcase label='Base input'>
				<Field>
					<Input type='text' placeholder='Enter your username' />
				</Field>
			</Showcase>

			<Showcase label='Number input'>
				<Field>
					<Input type='number' placeholder='Enter a number' icon={Hash} />
				</Field>
			</Showcase>

			<Showcase label='Telephone input'>
				<Field>
					<Input type='tel' placeholder='+1 (555) 000-0000' icon={Phone} />
				</Field>
			</Showcase>

			<Showcase label='Card number input'>
				<Field>
					<Input type='text' placeholder='1234 5678 9012 3456' icon={CreditCard} />
				</Field>
			</Showcase>

			<Showcase label='Date input'>
				<Field>
					<Input type='date' icon={Calendar} position='end' />
				</Field>
			</Showcase>

			<Showcase label='Search input'>
				<Field>
					<Input type='search' placeholder='Search...' icon={Search} />
				</Field>
			</Showcase>

			<Showcase label='Input with label'>
				<Field>
					<Label htmlFor='email'>Email</Label>
					<Input id='email' type='email' placeholder='john@example.com' icon={Mail} />
				</Field>
			</Showcase>

			<Showcase label='Input with disabled state'>
				<Field>
					<Label htmlFor='required'>Username</Label>
					<Input id='required' type='text' placeholder='Enter username' icon={User} disabled />
				</Field>
			</Showcase>

			<Showcase label='Input with required label and description'>
				<Field description='Password must be at least 8 characters'>
					<Label htmlFor='password' required>
						Password
					</Label>
					<Input icon={Lock} position='end' type='password' placeholder='Enter password' />
				</Field>
			</Showcase>

			<Showcase label='Input with error'>
				<Field
					error='Please enter a valid email address'
					description='Subscribe to receive our newsletter'>
					<Label htmlFor='email' required>
						Email
					</Label>
					<Input type='email' icon={Mail} placeholder='Invalid email' invalid />
				</Field>
			</Showcase>

			<Showcase label='Input group with text prefix' className='col-span-full'>
				<Field className='max-w-md' description='Enter your full website address'>
					<Label htmlFor='website'>Website</Label>
					<Group>
						<GroupItem>
							<span className='text-sm text-foreground'>https://</span>
						</GroupItem>
						<Input type='text' placeholder='example.com' />
					</Group>
				</Field>
			</Showcase>

			<Showcase label='Input group with button suffix' className='col-span-full'>
				<Field className='max-w-md' description='Subscribe to receive our newsletter'>
					<Label htmlFor='subscribe'>Email</Label>
					<Group>
						<Input icon={Mail} type='email' placeholder='john@example.com' />
						<SwapButton variant='primary' label='Subscribe' />
					</Group>
				</Field>
			</Showcase>

			<Showcase label='Input group with select prefix' className='col-span-full'>
				<Field className='max-w-md' description='Enter your phone number'>
					<Label htmlFor='phone'>Phone</Label>
					<Group invalid>
						<Select id='prefix'>
							<option value='+1'>+1</option>
							<option value='+44'>+44</option>
							<option value='+61'>+61</option>
						</Select>
						<Input type='tel' position='end' placeholder='(555) 555-5555' />
					</Group>
				</Field>
			</Showcase>
		</Gallery>
	);
};
