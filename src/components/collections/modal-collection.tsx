import * as React from 'react';
import { Trash, TriangleAlert, X, ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/primitive/button';
import { Avatar } from '@/components/primitive/avatar';
import { Gallery } from '@/components/primitive/gallery';
import { Showcase } from '@/components/primitive/showcase';

import { Modal, ModalContent, ModalBody, ModalFooter } from '@/components/primitive/modal';
import { ScrambleButton } from '@/components/collections/button/scramble-button';

import { CrtModal } from '@/components/collections/modal/crt-modal';
import { BlurModal } from '@/components/collections/modal/blur-modal';
import { ScaleModal } from '@/components/collections/modal/scale-modal';
import { SlideModal } from '@/components/collections/modal/slide-modal';
import { SwapButton } from '@/components/collections/button/swap-button';
import { RotateModal } from '@/components/collections/modal/rotate-modal';
import { ElasticModal } from '@/components/collections/modal/elastic-modal';
import { NewspaperModal } from '@/components/collections/modal/newspaper-modal';
import { FormDemo, ModalDemo } from '@/components/demo/shared';

const useModalState = () => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return {
		open,
		handleOpen,
		handleClose,
	};
};

export const ModalCollection = () => {
	const simple = useModalState();
	const footer = useModalState();
	const label = useModalState();
	const avatar = useModalState();
	const confirm = useModalState();
	const blur = useModalState();
	const slide = useModalState();
	const scale = useModalState();
	const rotate = useModalState();
	const crt = useModalState();
	const elastic = useModalState();
	const newspaper = useModalState();

	return (
		<Gallery title='Modal collections' description='A collection of modal components.'>
			<Showcase label='Simple modal with button trigger'>
				<Button variant='secondary' onClick={simple.handleOpen}>
					Open modal
				</Button>
				<Modal open={simple.open} onClick={simple.handleClose}>
					<ModalContent title='Welcome back'>
						<ModalBody>
							<p>
								This is a simple modal with a button trigger, which opens the modal on click. You
								can close the modal by clicking the close button or by clicking outside of the
								modal.
							</p>
						</ModalBody>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Simple modal with footer'>
				<Button variant='secondary' onClick={footer.handleOpen}>
					Open modal
				</Button>
				<Modal open={footer.open} onClick={footer.handleClose}>
					<ModalContent title='Welcome back'>
						<ModalDemo
							onClose={footer.handleClose}
							description='This is a simple modal with a footer, which opens the modal on click. You
								can close the modal by clicking the close button or by clicking outside of the
								modal.'
						/>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Modal with label trigger and size large'>
				<label onClick={label.handleOpen} className='text-foreground link-accent cursor-pointer'>
					Read terms
				</label>
				<Modal open={label.open} onClick={label.handleClose}>
					<ModalContent title='Terms of service' size='lg'>
						<ModalDemo
							onClose={label.handleClose}
							description={`
								By using this service you agree to our terms and conditions.
								We collect minimal data necessary to provide the service, and we will never sell your data to third parties.
								You can request deletion of your account and associated data at any time by contacting support.
							`}
						/>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Modal with avatar trigger'>
				<Avatar
					src='https://picsum.photos/seed/img1/400/300'
					alt='Avatar'
					onClick={avatar.handleOpen}
				/>
				<Modal open={avatar.open} onClick={avatar.handleClose}>
					<ModalContent title='Account' size='lg' closeable>
						<ModalBody>
							<FormDemo />
						</ModalBody>
						<ModalFooter>
							<ScrambleButton
								icon={X}
								label='Dismiss'
								variant='ghost'
								onClick={avatar.handleClose}
							/>
							<SwapButton
								position='end'
								variant='primary'
								icon={ArrowUpRight}
								label='Update profile'
							/>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Confirm destructive action'>
				<Button variant='destructive' onClick={confirm.handleOpen}>
					Delete account
				</Button>
				<Modal open={confirm.open} onClick={confirm.handleClose}>
					<ModalContent title='Delete account' closeable={false}>
						<ModalBody className='flex flex-col items-center gap-3 text-center'>
							<TriangleAlert size={32} />
							<p>
								This will permanently delete your account and all associated data. This action
								cannot be undone and there is no way to recover your content.
							</p>
						</ModalBody>
						<ModalFooter>
							<ScrambleButton
								icon={X}
								label='Dismiss'
								variant='ghost'
								onClick={confirm.handleClose}
							/>
							<SwapButton icon={Trash} label='Delete account' variant='destructive' />
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Modal with blur variant'>
				<Button variant='secondary' onClick={blur.handleOpen}>
					Open blur modal
				</Button>
				<Modal open={blur.open} onClick={blur.handleClose}>
					<BlurModal title='Welcome back'>
						<ModalDemo
							description='This will temporarily blur the background and fade in on open. This is useful for modals that require user interaction.'
							onClose={blur.handleClose}
						/>
					</BlurModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with slide variant'>
				<Button variant='secondary' onClick={slide.handleOpen}>
					Open slide modal
				</Button>
				<Modal open={slide.open} onClick={slide.handleClose}>
					<SlideModal title='Welcome back'>
						<ModalDemo
							description='This will slide up from the bottom of the screen on open. This is useful for modals that require user interaction.'
							onClose={slide.handleClose}
						/>
					</SlideModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with scale variant'>
				<Button variant='secondary' onClick={scale.handleOpen}>
					Open scale modal
				</Button>
				<Modal open={scale.open} onClick={scale.handleClose}>
					<ScaleModal title='Welcome back'>
						<ModalDemo
							description='This will scale down from 110% to 100% on open. This creates a subtle pop-in effect that draws attention to the modal content.'
							onClose={scale.handleClose}
						/>
					</ScaleModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with rotate variant'>
				<Button variant='secondary' onClick={rotate.handleOpen}>
					Open rotate modal
				</Button>
				<Modal open={rotate.open} onClick={rotate.handleClose}>
					<RotateModal title='Welcome back'>
						<ModalDemo
							description='This rotates in from the left side like a door swinging open. Uses 3D transform with perspective for a realistic door-swing effect.'
							onClose={rotate.handleClose}
						/>
					</RotateModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with crt variant'>
				<Button variant='secondary' onClick={crt.handleOpen}>
					Open crt modal
				</Button>
				<Modal open={crt.open} onClick={crt.handleClose}>
					<CrtModal title='Welcome back'>
						<ModalDemo
							description='This expands from the center like an old CRT TV turning on. Uses expo.out easing for a sharp, snappy animation.'
							onClose={crt.handleClose}
						/>
					</CrtModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with elastic variant'>
				<Button variant='secondary' onClick={elastic.handleOpen}>
					Open elastic modal
				</Button>
				<Modal open={elastic.open} onClick={elastic.handleClose}>
					<ElasticModal title='Welcome back'>
						<ModalDemo
							description='This bounces with an elastic overshoot effect. Uses GSAPs elastic ease to create a playful, springy animation that overshoots before settling.'
							onClose={elastic.handleClose}
						/>
					</ElasticModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with newspaper variant'>
				<Button variant='secondary' onClick={newspaper.handleOpen}>
					Open newspaper modal
				</Button>
				<Modal open={newspaper.open} onClick={newspaper.handleClose}>
					<NewspaperModal title='Welcome back'>
						<ModalDemo
							description='This unfolds like a newspaper being opened. Combines scale on both axes with a subtle rotation for a paper-unfolding effect.'
							onClose={newspaper.handleClose}
						/>
					</NewspaperModal>
				</Modal>
			</Showcase>
		</Gallery>
	);
};
