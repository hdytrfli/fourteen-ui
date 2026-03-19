import * as React from 'react';

interface UseAccordionProps {
	initial?: string;
	type: 'single' | 'multiple';
}

export function useAccordion({ type, initial }: UseAccordionProps) {
	const [value, setValue] = React.useState<string | null>(initial || null);
	const [values, setValues] = React.useState<string[]>(initial ? [initial] : []);

	const onToggle = React.useCallback(
		(value: string) => {
			if (type === 'single') setValue((p) => (p === value ? null : value));
			else setValues((p) => (p.includes(value) ? p.filter((x) => x !== value) : [...p, value]));
		},
		[type]
	);

	return { type, value, values, onToggle };
}
