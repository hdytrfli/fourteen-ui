import * as React from 'react';
import {
	Mail,
	User,
	Globe,
	CreditCard,
	Calendar,
	Landmark,
	DollarSign,
	Euro,
	PoundSterling,
	UserPlus2,
} from 'lucide-react';

import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { Label } from '@/components/primitive/label';
import { Field } from '@/components/primitive/field';
import { Select } from '@/components/primitive/select';
import { Group, GroupItem } from '@/components/primitive/group';
import { SwapButton } from './button/swap-button';

interface SelectCollectionProps {
	//
}

const currencies = [
	{ id: 'EUR', icon: Euro, label: 'European Euro' },
	{ id: 'USD', icon: DollarSign, label: 'United States Dollar' },
	{ id: 'GBP', icon: PoundSterling, label: 'British Poundsterling' },
] as const;

const eur = currencies[0];
type Currency = (typeof currencies)[number];

export const SelectCollection: React.FC<SelectCollectionProps> = () => {
	const [currency, setCurrency] = React.useState<Currency>(eur);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const found = currencies.find((curr) => curr.id === e.target.value);
		if (found) setCurrency(found);
	};

	return (
		<Gallery
			title='Select'
			className='md:grid-cols-2'
			description='A collection of native select components.'>
			<Showcase label='Base select'>
				<Field>
					<Select>
						<option value='option-1'>Option 1</option>
						<option value='option-2'>Option 2</option>
						<option value='option-3'>Option 3</option>
					</Select>
				</Field>
			</Showcase>

			<Showcase label='Select with label'>
				<Field>
					<Label htmlFor='country'>Country</Label>
					<Select id='country'>
						<option value='us'>United States</option>
						<option value='uk'>United Kingdom</option>
						<option value='ca'>Canada</option>
					</Select>
				</Field>
			</Showcase>

			<Showcase label='Select with icon'>
				<Field>
					<Label htmlFor='category'>Category</Label>
					<Select id='category' icon={Globe}>
						<option value='technology'>Technology</option>
						<option value='business'>Business</option>
						<option value='design'>Design</option>
					</Select>
				</Field>
			</Showcase>

			<Showcase label='Select with icon end'>
				<Field>
					<Label htmlFor='priority'>Priority</Label>
					<Select id='priority'>
						<option value='low'>Low</option>
						<option value='medium'>Medium</option>
						<option value='high'>High</option>
					</Select>
				</Field>
			</Showcase>

			<Showcase label='Select with required label'>
				<Field>
					<Label htmlFor='role' required>
						Role
					</Label>
					<Select id='role' icon={User}>
						<option value='admin'>Admin</option>
						<option value='editor'>Editor</option>
						<option value='viewer'>Viewer</option>
					</Select>
				</Field>
			</Showcase>

			<Showcase label='Select with description'>
				<Field description='Select your preferred contact method'>
					<Label htmlFor='contact'>Contact Method</Label>
					<Select id='contact' icon={Mail}>
						<option value='email'>Email</option>
						<option value='phone'>Phone</option>
						<option value='sms'>SMS</option>
					</Select>
				</Field>
			</Showcase>

			<Showcase label='Select with error'>
				<Field error='Please select a valid card type'>
					<Label htmlFor='card' required>
						Card Type
					</Label>
					<Select id='card' icon={CreditCard} invalid>
						<option value='visa'>Visa</option>
						<option value='mastercard'>Mastercard</option>
						<option value='amex'>American Express</option>
					</Select>
				</Field>
			</Showcase>

			<Showcase label='Select with icon end and error'>
				<Field error='Expiration date is required'>
					<Label htmlFor='expiry' required>
						Expiration
					</Label>
					<Select id='expiry' icon={Calendar} position='end' invalid>
						<option value='01'>January</option>
						<option value='02'>February</option>
						<option value='03'>March</option>
						<option value='04'>April</option>
						<option value='05'>May</option>
						<option value='06'>June</option>
					</Select>
				</Field>
			</Showcase>

			<Showcase label='Select in group with prefix icon' className='col-span-full'>
				<Field className='max-w-md' description='Select your currency preference'>
					<Label htmlFor='currency'>Currency</Label>
					<Group>
						<GroupItem className='text-sm text-foreground'>
							{currency ? <currency.icon size={16} /> : <Landmark size={16} />}
						</GroupItem>
						<Select id='currency' onChange={handleChange}>
							{Object.values(currencies).map(({ id, label }) => (
								<option key={id} value={id}>
									{label}
								</option>
							))}
						</Select>
					</Group>
				</Field>
			</Showcase>

			<Showcase label='Select in group with suffix button' className='col-span-full'>
				<Field className='max-w-md' description='Select the user to add to the group'>
					<Label htmlFor='user'>Select user</Label>
					<Group>
						<Select id='user'>
							<option value='john'>John Doe</option>
							<option value='jane'>Jane Doe</option>
							<option value='bob'>Bob Smith</option>
						</Select>
						<SwapButton position='end' icon={UserPlus2} label='Add user' variant='primary' />
					</Group>
				</Field>
			</Showcase>
		</Gallery>
	);
};
