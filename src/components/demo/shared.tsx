import * as React from 'react';
import { Lock, Mail, User, X } from 'lucide-react';

import { Field } from '@/components/primitive/field';
import { Label } from '@/components/primitive/label';
import { Input } from '@/components/primitive/input';
import { Switch } from '@/components/primitive/switch';
import { FlyinButton } from '@/components/collections/button/flyin-button';
import { ModalBody, ModalFooter } from '@/components/primitive/modal';
import { ScrambleButton } from '@/components/collections/button/scramble-button';
import { DropdownItem } from '../primitive/dropdown';
import { ArrowUpRight, Copy, Pencil, Trash } from 'lucide-react';

export const FormDemo: React.FC = () => {
	return (
		<div className='grid gap-4'>
			<p>
				Hello, John Doe. This is your account setting, you can manage your preference here including
				your notification configuration.
			</p>
			<form className='grid md:grid-cols-2 gap-4'>
				<Field description='Your username must be at least 3 characters'>
					<Label htmlFor='username'>Username</Label>
					<Input id='username' type='text' placeholder='Enter your username' icon={User} />
				</Field>

				<Field description='Password must be at least 8 characters'>
					<Label htmlFor='password'>Password</Label>
					<Input icon={Lock} type='password' placeholder='Enter your password' />
				</Field>

				<Field
					className='col-span-full'
					description='We will never share your email with anyone else.'>
					<Label htmlFor='email'>Email</Label>
					<Input type='email' placeholder='Enter your email' icon={Mail} />
				</Field>

				<Field className='col-span-full' description='Allow us to send you emails about updates'>
					<div className='flex items-center justify-between'>
						<Label htmlFor='email-notifications'>Email notifications</Label>
						<Switch id='email-notifications' defaultChecked />
					</div>
				</Field>
			</form>
		</div>
	);
};

interface ModalContentProps {
	description: string;
	onClose: () => void;
}

export const ModalDemo = ({ description, onClose }: ModalContentProps) => {
	return (
		<React.Fragment>
			<ModalBody>
				<p>{description}</p>
			</ModalBody>
			<ModalFooter>
				<ScrambleButton icon={X} label='Dismiss' variant='ghost' onClick={onClose} />
				<FlyinButton icon={User} variant='primary' label='Go to dashboard' />
			</ModalFooter>
		</React.Fragment>
	);
};

export const DropdownDemo = () => {
	return (
		<React.Fragment>
			<label className='block px-3 py-3 text-sm font-medium'>Application menu</label>
			<hr className='border-b  border-dashed' />
			<DropdownItem position='end' label='Edit data' icon={Pencil} />
			<DropdownItem position='end' label='Duplicate data' icon={Copy} />
			<DropdownItem position='end' label='Open dashboard' icon={ArrowUpRight} />
			<DropdownItem position='end' label='Delete data' icon={Trash} variant='destructive' />
		</React.Fragment>
	);
};
