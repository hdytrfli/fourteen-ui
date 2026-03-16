import { Trash, TriangleAlert, User, LogOut, X } from 'lucide-react';

import { useModalState } from '@/hooks/use-modal-state';
import { Button } from '@/components/primitive/button';
import { Avatar } from '@/components/primitive/avatar';
import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';

import { cn } from '@/libs/utils';
import { Modal } from '@/components/primitive/modal';
import { TiltButton } from '@/components/collections/button/tilt-button';
import { ScrambleButton } from '@/components/collections/button/scramble-button';
import { ModalBody, ModalContent, ModalFooter } from '@/components/primitive/modal-content';
import { FlyinButton } from './collections/button/flyin-button';
import { SlideModal } from './collections/modal/slide-modal';
import { BlurModal } from './collections/modal/blur-modal';

export const ModalCollection = () => {
	const simple = useModalState();
	const footer = useModalState();
	const label = useModalState();
	const avatar = useModalState();
	const confirm = useModalState();
	const blur = useModalState();
	const slide = useModalState();

	return (
		<Gallery title='Modal' description='A collection of modal components.'>
			<Showcase label='Simple modal with button trigger'>
				<Button variant='secondary' onClick={simple.onOpen}>
					Open modal
				</Button>
				<Modal open={simple.open} onClose={simple.onClose}>
					<ModalContent title='Welcome back'>
						<ModalBody>
							<p>
								You have 3 unread notifications and 2 pending tasks. Head to your dashboard to
								review them or dismiss this message.
							</p>
						</ModalBody>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Simple modal with footer'>
				<Button variant='secondary' onClick={footer.onOpen}>
					Open modal
				</Button>
				<Modal open={footer.open} onClose={footer.onClose}>
					<ModalContent title='Welcome back'>
						<ModalBody>
							<p>
								You have 3 unread notifications and 2 pending tasks. Head to your dashboard to
								review them or dismiss this message.
							</p>
						</ModalBody>
						<ModalFooter>
							<TiltButton
								icon={X}
								position='start'
								label='Dismiss'
								variant='ghost'
								className='rounded-xl'
								onClick={footer.onClose}
							/>
							<FlyinButton
								icon={User}
								position='start'
								variant='primary'
								label='Go to dashboard'
								className='rounded-xl'
							/>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Modal with label trigger and size large'>
				<label
					onClick={label.onOpen}
					className='text-foreground underline underline-offset-2 decoration-wavy cursor-pointer'>
					Read terms
				</label>
				<Modal open={label.open} onClose={label.onClose}>
					<ModalContent title='Terms of service' size='lg'>
						<ModalBody>
							<p>
								By using this service you agree to our terms and conditions. We collect minimal data
								necessary to provide the service, and we will never sell your data to third parties.
								You can request deletion of your account and associated data at any time by
								contacting support. Continued use of the service constitutes acceptance of any
								future updates to these terms.
							</p>
						</ModalBody>
						<ModalFooter>
							<TiltButton
								icon={X}
								position='start'
								label='Decline'
								variant='ghost'
								className='rounded-xl'
								onClick={label.onClose}
							/>
							<ScrambleButton
								icon={LogOut}
								position='start'
								label='Accept terms'
								variant='primary'
								className='rounded-xl'
							/>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Modal with avatar trigger'>
				<Avatar
					src='https://picsum.photos/seed/img1/400/300'
					alt='Avatar'
					onClick={avatar.onOpen}
				/>
				<Modal open={avatar.open} onClose={avatar.onClose}>
					<ModalContent title='Account' size='lg' closeable>
						<ModalBody className='grid gap-4 '>
							<p>
								Hello, John Doe. This is your account page. You can manage your account settings
								here or delete your account if you want.
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
						</ModalBody>
						<ModalFooter>
							<TiltButton
								icon={X}
								position='start'
								label='Cancel'
								variant='ghost'
								className='rounded-xl'
								onClick={avatar.onClose}
							/>
							<ScrambleButton
								icon={LogOut}
								position='start'
								label='Login'
								variant='accent'
								className='rounded-xl'
							/>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Confirm destructive action'>
				<Button variant='destructive' onClick={confirm.onOpen}>
					Delete account
				</Button>
				<Modal open={confirm.open} onClose={confirm.onClose}>
					<ModalContent title='Delete account' closeable={false}>
						<ModalBody className='flex flex-col items-center gap-3 text-center'>
							<TriangleAlert size={32} />
							<p>
								This will permanently delete your account and all associated data. This action
								cannot be undone and there is no way to recover your content.
							</p>
						</ModalBody>
						<ModalFooter>
							<TiltButton
								icon={X}
								position='start'
								label='Cancel'
								variant='ghost'
								className='rounded-xl'
								onClick={confirm.onClose}
							/>
							<ScrambleButton
								icon={Trash}
								position='start'
								label='Delete account'
								variant='destructive'
								className='rounded-xl'
							/>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Modal with blur variant'>
				<Button variant='secondary' onClick={blur.onOpen}>
					Open modal
				</Button>
				<Modal open={blur.open} onClose={blur.onClose}>
					<BlurModal title='Welcome back'>
						<ModalBody>
							<p>
								This will temporarily blur the background and fade in on open. This is useful for
								modals that require user interaction.
							</p>
						</ModalBody>
						<ModalFooter>
							<TiltButton
								icon={X}
								position='start'
								label='Dismiss'
								variant='ghost'
								className='rounded-xl'
								onClick={blur.onClose}
							/>
							<FlyinButton
								icon={User}
								position='start'
								variant='primary'
								label='Go to dashboard'
								className='rounded-xl'
							/>
						</ModalFooter>
					</BlurModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with slide variant'>
				<Button variant='secondary' onClick={slide.onOpen}>
					Open modal
				</Button>
				<Modal open={slide.open} onClose={slide.onClose}>
					<SlideModal title='Welcome back'>
						<ModalBody>
							<p>
								This will slide up from the bottom of the screen on open. This is useful for modals
								that require user interaction.
							</p>
						</ModalBody>
						<ModalFooter>
							<TiltButton
								icon={X}
								position='start'
								label='Dismiss'
								variant='ghost'
								className='rounded-xl'
								onClick={slide.onClose}
							/>
							<FlyinButton
								icon={User}
								position='start'
								variant='primary'
								label='Go to dashboard'
								className='rounded-xl'
							/>
						</ModalFooter>
					</SlideModal>
				</Modal>
			</Showcase>
		</Gallery>
	);
};
