import * as React from 'react';
import { gsap } from 'gsap';

import { useModal } from '@/hooks/use-modal';
import { DURATION, EASE } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal-content';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant that scales down from 110% to 100% on open.
 * @param children - Modal body content
 */
export const ScaleModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.set(el, {
			opacity: 0,
			scale: 1.1,
		});
	}, []);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.to(el, {
			ease: EASE.out,
			opacity: open ? 1 : 0,
			scale: open ? 1 : 1.1,
			duration: DURATION.slow,
		});
	}, [open]);

	return (
		<div ref={ref}>
			<ModalContent {...rest}>{children}</ModalContent>
		</div>
	);
};
