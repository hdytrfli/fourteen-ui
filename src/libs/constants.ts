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
