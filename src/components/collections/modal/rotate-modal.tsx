import * as React from 'react';
import { gsap } from 'gsap';

import { useModal } from '@/hooks/use-modal';
import { DURATION, EASE } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal-content';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant that rotates in from the left like a door swinging open.
 * @param children - Modal body content
 */
export const RotateModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.set(el, {
			opacity: 0,
			rotate: -10,
		});
	}, []);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.to(el, {
			ease: EASE.inOut,
			opacity: open ? 1 : 0,
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
