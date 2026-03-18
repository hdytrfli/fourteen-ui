import * as React from 'react';

interface UseTocActiveIdOptions {
	margin?: string;
	headings: string[];
}

/**
 * Hook to track which heading is currently in view.
 * @param headings - Array of heading ids to observe
 * @param margin - Margin around the root element for intersection detection
 */
export function useHeadingObserver({
	headings,
	margin = '-20% 0% -35% 0%',
}: UseTocActiveIdOptions): string {
	const [active, setActive] = React.useState<string>('');

	React.useEffect(() => {
		if (headings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
			{ rootMargin: margin }
		);

		const [first] = headings;
		if (!active) setActive(first);

		headings.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [active, headings, margin]);

	return active;
}
