import * as React from 'react';
import Lenis from 'lenis';
import { DURATION } from '@/libs/constants';

interface LenisProps extends React.ComponentProps<'div'> {
	//
}

/**
 * Lenis smooth scroll provider.
 * Wraps the app to enable smooth scrolling globally.
 */
export const LenisProvider: React.FC<LenisProps> = ({ children }) => {
	const lenisRef = React.useRef<Lenis>(null);

	React.useLayoutEffect(() => {
		const lenis = new Lenis({
			infinite: false,
			orientation: 'vertical',
			duration: DURATION.late,
			gestureOrientation: 'vertical',
		});

		lenisRef.current = lenis;

		const raf = (time: number) => {
			lenis.raf(time);
			requestAnimationFrame(raf);
		};

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
};
