import * as React from 'react';
import { gsap } from 'gsap';
import { useModal } from '@/hooks/use-modal';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal-content';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant that unfolds like a newspaper being opened.
 * Combines scale on both axes with a subtle rotation.
 * @param children - Modal body content
 */
export const NewspaperModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const contentRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const container = contentRef.current;
		if (!container) return;

		const states = {
			open: {
				opacity: VALUES.visible,
				scaleX: VALUES.one,
				scaleY: VALUES.one,
				rotate: VALUES.zero,
				transformOrigin: 'center center',
				ease: EASE.default,
			},
			closed: {
				opacity: VALUES.hidden,
				scaleX: VALUES.zero,
				scaleY: VALUES.zero,
				rotate: -10,
				transformOrigin: 'center center',
				ease: EASE.default,
			},
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
