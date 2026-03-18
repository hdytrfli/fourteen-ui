import * as React from 'react';

import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { Label } from '@/components/primitive/label';
import { Field } from '@/components/primitive/field';
import { Switch } from '@/components/primitive/switch';

interface SwitchCollectionProps {
	//
}

export const SwitchCollection: React.FC<SwitchCollectionProps> = () => {
	const [dark, setDark] = React.useState(false);
	const [checked, setChecked] = React.useState(true);
	const [notifications, setNotifications] = React.useState(true);

	return (
		<Gallery
			title='Switch collections'
			className='md:grid-cols-2'
			description='Switch toggle components for boolean inputs with smooth transitions.'>
			<Showcase label='Base switch'>
				<Field>
					<Switch defaultChecked />
				</Field>
			</Showcase>

			<Showcase label='Switch with label'>
				<Field>
					<Label>Enable notifications</Label>
					<Switch checked={notifications} onCheckedChange={setNotifications} />
				</Field>
			</Showcase>

			<Showcase label='Switch with description'>
				<Field description='Turn on to receive push notifications'>
					<Label>Push Notifications</Label>
					<Switch defaultChecked />
				</Field>
			</Showcase>

			<Showcase label='Disabled switch'>
				<Field description="This switch is disabled and can't be toggled">
					<Label>Disabled</Label>
					<Switch disabled />
				</Field>
			</Showcase>

			<Showcase label='Disabled checked switch'>
				<Field description='This switch is disabled and starts checked'>
					<Label>Disabled (checked)</Label>
					<Switch defaultChecked disabled />
				</Field>
			</Showcase>

			<Showcase label='Switch with inline label'>
				<Field description='Toggle dark mode on or off'>
					<div className='flex items-center justify-between'>
						<Label>Dark Mode</Label>
						<Switch checked={dark} onCheckedChange={setDark} />
					</div>
				</Field>
			</Showcase>

			<Showcase label='Controlled switch'>
				<Field description={checked ? 'The switch is checked' : 'The switch is not checked'}>
					<div className='flex items-center justify-between'>
						<Label>Controlled State</Label>
						<Switch checked={checked} onCheckedChange={setChecked} />
					</div>
				</Field>
			</Showcase>

			<Showcase label='Multiple switches'>
				<Field className='gap-4'>
					<div className='flex items-center justify-between'>
						<Label>Airplane Mode</Label>
						<Switch />
					</div>
					<div className='flex items-center justify-between'>
						<Label>Bluetooth</Label>
						<Switch defaultChecked />
					</div>
					<div className='flex items-center justify-between'>
						<Label>Location</Label>
						<Switch defaultChecked />
					</div>
				</Field>
			</Showcase>
		</Gallery>
	);
};

// const ControlledSwitchExample = () => {
// 	const [enabled, setEnabled] = React.useState(false);

// 	return (
// 		<div className='flex items-center gap-4'>
// 			<Switch checked={enabled} onCheckedChange={setEnabled} />
// 			<span className='text-sm text-text'>
// 				Status: <span className='text-foreground font-medium'>{enabled ? 'On' : 'Off'}</span>
// 			</span>
// 		</div>
// 	);
// };
