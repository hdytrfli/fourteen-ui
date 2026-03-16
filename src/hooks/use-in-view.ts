import * as React from 'react';

interface UseInViewOptions {
	once?: boolean;
	threshold?: number;
	root?: Element | null;
	margin?: string;
}

interface UseInViewReturn {
	ref: React.RefObject<HTMLDivElement | null>;
	shown: boolean;
}

/**
 * Hook that detects when an element enters the viewport.
 * @param options - IntersectionObserver configuration
 * @returns ref to attach to element, and isInView boolean
 */
export const useInView = ({
	once = true,
	root = null,
	margin = '0px',
	threshold = 0.3,
}: UseInViewOptions = {}): UseInViewReturn => {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const [shown, setShown] = React.useState(false);

	React.useLayoutEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setShown(true);
						if (once) {
							observer.unobserve(element);
						}
					} else if (!once) {
						setShown(false);
					}
				});
			},
			{ threshold, root, rootMargin: margin }
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [threshold, root, margin, once]);

	return { ref, shown };
};
