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
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;

		gsap.set(element, {
			opacity: 0,
			scaleX: 0,
			scaleY: 0,
			rotate: -10,
			transformOrigin: 'center center',
		});
	}, []);

	React.useLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;

		const states = {
			open: {
				opacity: VALUES.visible,
				scaleX: VALUES.one,
				scaleY: VALUES.one,
				rotate: VALUES.zero,
				ease: EASE.default,
			},
			closed: {
				opacity: VALUES.hidden,
				scaleX: VALUES.zero,
				scaleY: VALUES.zero,
				rotate: -10,
				ease: EASE.default,
			},
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
