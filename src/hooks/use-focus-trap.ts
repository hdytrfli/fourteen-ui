import * as React from 'react';

interface FocusTrapProps {
	ref: React.RefObject<HTMLElement | null>;
	active: boolean;
	onEscape?: () => void;
}

const FOCUSABLE_SELECTORS = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'textarea:not([disabled])',
	'select:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Traps focus within a container element while active.
 * Cycles focus with Tab/Shift+Tab and supports Escape to deactivate.
 * @param ref - Ref to the container element
 * @param active - Whether the focus trap is enabled
 * @param onEscape - Optional callback when Escape is pressed
 */
export const useFocusTrap = ({ ref, active, onEscape }: FocusTrapProps) => {
	const prev = React.useRef<HTMLElement | null>(null);

	React.useLayoutEffect(() => {
		if (!active || !ref.current) return;
		const focusables = ref.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
		if (focusables.length === 0) return;

		const first = focusables[0];
		const last = focusables[focusables.length - 1];
		prev.current = document.activeElement as HTMLElement;
		first.focus();

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				if (onEscape) onEscape();
				return;
			}

			if (e.key !== 'Tab' || focusables.length === 0) return;

			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			prev.current?.focus();
		};
	}, [active, onEscape, ref]);
};
