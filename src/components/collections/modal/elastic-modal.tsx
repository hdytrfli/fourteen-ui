import * as React from 'react';
import { gsap } from 'gsap';

import { useModal } from '@/hooks/use-modal';
import { DURATION } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal-content';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant that bounces with an elastic overshoot effect.
 * @param children - Modal body content
 */
export const ElasticModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.set(el, {
			opacity: 0,
			scale: 0.5,
		});
	}, []);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.to(el, {
			ease: 'elastic.out(1, 0.5)',
			opacity: open ? 1 : 0,
			scale: open ? 1 : 0.5,
			duration: DURATION.slow,
		});
	}, [open]);

	return (
		<div ref={ref}>
			<ModalContent {...rest}>{children}</ModalContent>
		</div>
	);
};
