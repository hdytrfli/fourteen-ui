import * as React from 'react';
import { gsap } from 'gsap';

import { useModal } from '@/hooks/use-modal';
import { DURATION, EASE, VALUES } from '@/libs/constants';
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
		const element = ref.current;
		if (!element) return;

		gsap.set(element, {
			opacity: 0,
			rotate: -10,
		});
	}, []);

	React.useLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;

		const states = {
			open: { opacity: VALUES.visible, rotate: VALUES.zero, ease: EASE.default },
			closed: { opacity: VALUES.hidden, rotate: -10, ease: EASE.default },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(element, {
			...states[state],
			duration: DURATION.base,
		});
	}, [open]);

	return (
		<div ref={ref}>
			<ModalContent {...rest}>{children}</ModalContent>
		</div>
	);
};
