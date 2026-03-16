import * as React from 'react';
import Lenis from 'lenis';
import { DURATION } from '@/libs/constants';

interface Props {
	children: React.ReactNode;
}

/**
 * Lenis smooth scroll provider.
 * Wraps the app to enable smooth scrolling globally.
 */
export const LenisProvider = ({ children }: Props) => {
	const lenisRef = React.useRef<Lenis | null>(null);

	React.useLayoutEffect(() => {
		const lenis = new Lenis({
			infinite: false,
			touchMultiplier: 2,
			orientation: 'vertical',
			duration: DURATION.late,
			gestureOrientation: 'vertical',
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		lenisRef.current = lenis;

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
};
