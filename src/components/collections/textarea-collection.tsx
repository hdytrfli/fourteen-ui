import * as React from 'react';

import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';
import { Label } from '@/components/primitive/label';
import { Field } from '@/components/primitive/field';
import { Textarea } from '@/components/primitive/textarea';

interface TextareaCollectionProps {
	//
}

export const TextareaCollection: React.FC<TextareaCollectionProps> = () => {
	return (
		<Gallery
			title='Textarea'
			className='md:grid-cols-2'
			description='A collection of textarea components for multi-line text input.'>
			<Showcase label='Base textarea'>
				<Field>
					<Textarea placeholder='Enter your message...' />
				</Field>
			</Showcase>
			<Showcase label='Textarea with label'>
				<Field>
					<Label htmlFor='message'>Message</Label>
					<Textarea id='message' placeholder='Write your message here...' />
				</Field>
			</Showcase>
			<Showcase label='Textarea with required label'>
				<Field>
					<Label htmlFor='feedback' required>
						Feedback
					</Label>
					<Textarea id='feedback' placeholder='Tell us what you think...' />
				</Field>
			</Showcase>
			<Showcase label='Textarea with description'>
				<Field description='Maximum 500 characters'>
					<Label htmlFor='bio'>Biography</Label>
					<Textarea id='bio' placeholder='Tell us about yourself...' />
				</Field>
			</Showcase>
			<Showcase label='Disabled textarea'>
				<Field>
					<Label htmlFor='disabled'>Read-only Notes</Label>
					<Textarea disabled id='disabled' defaultValue='This content is read-only...' />
				</Field>
			</Showcase>

			<Showcase label='Textarea with error'>
				<Field error='Message must be at least 10 characters'>
					<Label htmlFor='error-message' required>
						Message
					</Label>
					<Textarea id='error-message' invalid placeholder='Enter your message...' />
				</Field>
			</Showcase>

			<Showcase label='Textarea with custom rows'>
				<Field>
					<Label htmlFor='notes'>Notes</Label>
					<Textarea id='notes' rows={4} placeholder='Add your notes here...' />
				</Field>
			</Showcase>
		</Gallery>
	);
};
