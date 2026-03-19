import * as React from 'react';

interface HeadingObserverProps {
	margin?: string;
	headings: string[];
}

type ElementID = string;
type SetElementID = Set<ElementID>;
const initial = new Set<ElementID>();

/**
 * Hook to track which heading is currently in view.
 * @param headings - Array of heading ids to observe
 * @param margin - Margin around the root element for intersection detection
 */
export const useHeadingObserver = ({
	headings,
	margin = '0% 0% 0% 0%',
}: HeadingObserverProps): string => {
	const [active, setActive] = React.useState<ElementID>('');
	const intersecting = React.useRef<SetElementID>(initial);

	React.useEffect(() => {
		const current = intersecting.current;
		if (headings.length === 0) return;

		const [first] = headings;
		if (!active) setActive(first);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						intersecting.current.add(entry.target.id);
					} else {
						intersecting.current.delete(entry.target.id);
					}
				});

				const topmost = headings.find((id) => intersecting.current.has(id));
				if (topmost) setActive(topmost);
			},
			{ rootMargin: margin }
		);

		headings.forEach((id) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		return () => {
			observer.disconnect();
			current.clear();
		};
	}, [active, headings, margin]);

	return active;
};
