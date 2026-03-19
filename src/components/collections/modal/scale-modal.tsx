import * as React from 'react';
import { gsap } from 'gsap';
import { useModal } from '@/hooks/use-modal';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant that scales down from 110% to 100% on open.
 * @param children - Modal body content
 */
export const ScaleModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const states = {
			open: { opacity: VALUES.visible, scale: VALUES.one, ease: EASE.default },
			closed: { opacity: VALUES.hidden, scale: 1.1, ease: EASE.default },
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
