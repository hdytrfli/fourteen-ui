import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE, DISTANCE_MODAL } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal-content';
import { useModal } from '@/hooks/use-modal';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant that slides up from the bottom on open.
 * @param children - Modal body content
 */
export const SlideModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		gsap.set(el, { opacity: 0, y: DISTANCE_MODAL });
	}, []);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.to(el, {
			ease: EASE.inOut,
			opacity: open ? 1 : 0,
			duration: DURATION.slow,
			y: open ? 0 : DISTANCE_MODAL,
		});
	}, [open]);

	return (
		<div ref={ref}>
			<ModalContent {...rest}>{children}</ModalContent>
		</div>
	);
};
