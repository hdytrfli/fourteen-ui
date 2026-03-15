import clsx, { type ClassValue } from 'clsx';
import { twMerge as merge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes with ease.
 * @param inputs - Array of class values
 */
export const cn = (...inputs: ClassValue[]) => {
	return merge(clsx(inputs));
};

/**
 * Splits a string into an array of characters for staggered animations.
 * @param text - The string to split
 */
export const split = (text: string): string[] => text.split('');
