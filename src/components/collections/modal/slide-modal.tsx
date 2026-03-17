import * as React from 'react';
import { gsap } from 'gsap';
import { useModal } from '@/hooks/use-modal';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal-content';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant that slides up from the bottom.
 * @param children - Modal body content
 */
export const SlideModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const states = {
			open: { opacity: VALUES.visible, y: VALUES.zero, ease: EASE.default },
			closed: { opacity: VALUES.hidden, y: 40, ease: EASE.default },
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
