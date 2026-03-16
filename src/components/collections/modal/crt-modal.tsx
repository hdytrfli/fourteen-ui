import * as React from 'react';
import { gsap } from 'gsap';

import { useModal } from '@/hooks/use-modal';
import { DURATION, EASE } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal-content';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant with a CRT-style turn-on effect that expands from the center.
 * @param children - Modal body content
 */
export const CrtModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.set(el, {
			opacity: 0,
			scaleY: 0,
			transformOrigin: 'center center',
		});
	}, []);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.to(el, {
			ease: EASE.crt,
			opacity: open ? 1 : 0,
			scaleY: open ? 1 : 0,
			duration: DURATION.slow,
		});
	}, [open]);

	return (
		<div ref={ref}>
			<ModalContent {...rest}>{children}</ModalContent>
		</div>
	);
};
