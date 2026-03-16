import * as React from 'react';
import { gsap } from 'gsap';

import { useModal } from '@/hooks/use-modal';
import { DURATION, EASE } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal-content';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant that unfolds like a newspaper being opened.
 * Combines scale on both axes with a subtle rotation.
 * @param children - Modal body content
 */
export const NewspaperModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.set(el, {
			opacity: 0,
			scaleX: 0,
			scaleY: 0,
			rotate: -10,
			transformOrigin: 'center center',
		});
	}, []);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.to(el, {
			ease: EASE.out,
			opacity: open ? 1 : 0,
			scaleX: open ? 1 : 0,
			scaleY: open ? 1 : 0,
			rotate: open ? 0 : -10,
			duration: DURATION.slow,
		});
	}, [open]);

	return (
		<div ref={ref}>
			<ModalContent {...rest}>{children}</ModalContent>
		</div>
	);
};
