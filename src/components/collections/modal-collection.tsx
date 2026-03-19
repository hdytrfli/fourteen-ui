import { Trash, TriangleAlert, X, ArrowUpRight } from 'lucide-react';

import { useModalState } from '@/hooks/use-modal-state';
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
						<ModalDemo
							onClose={footer.onClose}
							description='This permanent footer with two buttons.'
						/>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Modal with label trigger and size large'>
				<label onClick={label.onOpen} className='text-foreground link-accent cursor-pointer'>
					Read terms
				</label>
				<Modal open={label.open} onClose={label.onClose}>
					<ModalContent title='Terms of service' size='lg'>
						<ModalDemo
							description={`
								By using this service you agree to our terms and conditions.
								We collect minimal data necessary to provide the service, and we will never sell your data to third parties.
								You can request deletion of your account and associated data at any time by contacting support.
							`}
							onClose={label.onClose}
						/>
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
						<ModalBody>
							<FormDemo />
						</ModalBody>
						<ModalFooter>
							<ScrambleButton icon={X} label='Dismiss' variant='ghost' onClick={avatar.onClose} />
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
							<SwapButton icon={X} label='Dismiss' variant='ghost' onClick={confirm.onClose} />
							<ScrambleButton icon={Trash} label='Delete account' variant='destructive' />
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Showcase>

			<Showcase label='Modal with blur variant'>
				<Button variant='secondary' onClick={blur.onOpen}>
					Open blur modal
				</Button>
				<Modal open={blur.open} onClose={blur.onClose}>
					<BlurModal title='Welcome back'>
						<ModalDemo
							description='This will temporarily blur the background and fade in on open. This is useful for modals that require user interaction.'
							onClose={blur.onClose}
						/>
					</BlurModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with slide variant'>
				<Button variant='secondary' onClick={slide.onOpen}>
					Open slide modal
				</Button>
				<Modal open={slide.open} onClose={slide.onClose}>
					<SlideModal title='Welcome back'>
						<ModalDemo
							description='This will slide up from the bottom of the screen on open. This is useful for modals that require user interaction.'
							onClose={slide.onClose}
						/>
					</SlideModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with scale variant'>
				<Button variant='secondary' onClick={scale.onOpen}>
					Open scale modal
				</Button>
				<Modal open={scale.open} onClose={scale.onClose}>
					<ScaleModal title='Welcome back'>
						<ModalDemo
							description='This will scale down from 110% to 100% on open. This creates a subtle pop-in effect that draws attention to the modal content.'
							onClose={scale.onClose}
						/>
					</ScaleModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with rotate variant'>
				<Button variant='secondary' onClick={rotate.onOpen}>
					Open rotate modal
				</Button>
				<Modal open={rotate.open} onClose={rotate.onClose}>
					<RotateModal title='Welcome back'>
						<ModalDemo
							description='This rotates in from the left side like a door swinging open. Uses 3D transform with perspective for a realistic door-swing effect.'
							onClose={rotate.onClose}
						/>
					</RotateModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with crt variant'>
				<Button variant='secondary' onClick={crt.onOpen}>
					Open crt modal
				</Button>
				<Modal open={crt.open} onClose={crt.onClose}>
					<CrtModal title='Welcome back'>
						<ModalDemo
							description='This expands from the center like an old CRT TV turning on. Uses expo.out easing for a sharp, snappy animation.'
							onClose={crt.onClose}
						/>
					</CrtModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with elastic variant'>
				<Button variant='secondary' onClick={elastic.onOpen}>
					Open elastic modal
				</Button>
				<Modal open={elastic.open} onClose={elastic.onClose}>
					<ElasticModal title='Welcome back'>
						<ModalDemo
							description='This bounces with an elastic overshoot effect. Uses GSAPs elastic ease to create a playful, springy animation that overshoots before settling.'
							onClose={elastic.onClose}
						/>
					</ElasticModal>
				</Modal>
			</Showcase>

			<Showcase label='Modal with newspaper variant'>
				<Button variant='secondary' onClick={newspaper.onOpen}>
					Open newspaper modal
				</Button>
				<Modal open={newspaper.open} onClose={newspaper.onClose}>
					<NewspaperModal title='Welcome back'>
						<ModalDemo
							description='This unfolds like a newspaper being opened. Combines scale on both axes with a subtle rotation for a paper-unfolding effect.'
							onClose={newspaper.onClose}
						/>
					</NewspaperModal>
				</Modal>
			</Showcase>
		</Gallery>
	);
};
