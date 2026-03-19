import type { ThemeItem } from '@/libs/types';
import { Eclipse, Moon, Sun } from 'lucide-react';

/**
 * Shared GSAP timing and easing tokens.
 */
export const STAGGER = { tight: 0.02, base: 0.05 } as const;
export const DURATION = { fast: 0.1, base: 0.3, slow: 0.5, late: 0.8 } as const;

export const EASE = {
	in: 'power4.in',
	crt: 'expo.out',
	out: 'power4.out',
	default: 'ease.in(1, 0.5)',
	elastic: 'elastic.out(1, 0.5)',
} as const;

/**
 * Numeric constants for animation values.
 */
export const VALUES = {
	zero: 0,
	one: 1,
	visible: 1,
	hidden: 0,
} as const;

/**
 * All available placements for anchored items
 */
export const PLACEMENTS = [
	{ id: 'top-left', label: 'Top left' },
	{ id: 'top-center', label: 'Top center' },
	{ id: 'top-right', label: 'Top right' },
	{ id: 'bottom-left', label: 'Bottom left' },
	{ id: 'bottom-center', label: 'Bottom center' },
	{ id: 'bottom-right', label: 'Bottom right' },
	{ id: 'left-top', label: 'Left top' },
	{ id: 'left-center', label: 'Left center' },
	{ id: 'left-bottom', label: 'Left bottom' },
	{ id: 'right-top', label: 'Right top' },
	{ id: 'right-center', label: 'Right center' },
	{ id: 'right-bottom', label: 'Right bottom' },
] as const;

/**
 * All available themes for the theme provider
 */
export const THEMES: ThemeItem[] = [
	{ label: 'Light', value: 'light', icon: Sun },
	{ label: 'Dark', value: 'dark', icon: Moon },
	{ label: 'System', value: 'system', icon: Eclipse },
];
