import * as React from 'react';
import { gsap } from 'gsap';
import { DURATION, EASE } from '@/libs/constants';
import { ModalContent } from '@/components/primitive/modal-content';
import { useModal } from '@/hooks/use-modal';

interface Props extends React.ComponentProps<typeof ModalContent> {}

/**
 * Modal variant that blurs and fades in on open.
 * @param children - Modal body content
 */
export const BlurModal = ({ children, ...rest }: Props) => {
	const { open } = useModal();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.set(el, {
			opacity: 0,
			filter: 'blur(8px)',
		});
	}, []);

	React.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		gsap.to(el, {
			ease: EASE.inOut,
			opacity: open ? 1 : 0,
			filter: open ? 'blur(0px)' : 'blur(8px)',
			duration: DURATION.slow,
		});
	}, [open]);

	return (
		<div ref={ref}>
			<ModalContent {...rest}>{children}</ModalContent>
		</div>
	);
};
