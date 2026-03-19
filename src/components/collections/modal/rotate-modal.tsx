import * as React from 'react';
import { gsap } from 'gsap';
import { useModal } from '@/hooks/use-modal';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant that rotates in from the left like a door swinging open.
 * @param children - Modal body content
 */
export const RotateModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const states = {
			open: { opacity: VALUES.visible, rotate: VALUES.zero, ease: EASE.default },
			closed: { opacity: VALUES.hidden, rotate: -10, ease: EASE.default },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.fromTo(container, states.closed, {
			...states[state],
			duration: DURATION.base,
		});

		return () => gsap.killTweensOf(container);
	}, [open]);

	return (
		<div ref={contentRef}>
			<ModalContent {...rest}>{children}</ModalContent>
		</div>
	);
};
