/**
 * Shared GSAP timing and easing tokens.
 */
export const STAGGER = { tight: 0.025, base: 0.05 } as const;
export const DURATION = { fast: 0.25, base: 0.3, slow: 0.8 } as const;

export const EASE = {
	default: 'power4.out',
	in: 'power4.in',
	out: 'power4.out',
	inOut: 'power4.inOut',
} as const;

const CHARS = [
	'!@#$%^&*()_+-=[]{}|;:,./<>?',
	'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	'abcdefghijklmnopqrstuvwxyz',
	'0123456789',
] as const;

export const SCRAMBLE_CHARS = CHARS.flat().join('');
