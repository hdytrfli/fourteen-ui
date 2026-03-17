import * as React from 'react';
import { gsap } from 'gsap';
import { useModal } from '@/hooks/use-modal';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal-content';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant with a CRT-style turn-on effect that expands from the center.
 * @param children - Modal body content
 */
export const CrtModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		gsap.set(container, {
			opacity: 0,
			scaleY: 0,
			transformOrigin: 'center center',
		});
	}, []);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const states = {
			open: { opacity: VALUES.visible, scaleY: VALUES.one, ease: EASE.crt },
			closed: { opacity: VALUES.hidden, scaleY: VALUES.zero, ease: EASE.crt },
		} as const;

		const state = open ? 'open' : 'closed';

		gsap.to(container, {
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
