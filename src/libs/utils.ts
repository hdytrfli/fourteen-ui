import clsx, { type ClassValue } from 'clsx';
import { twMerge as merge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes with ease.
 * @param inputs - Array of class values
 */
export const cn = (...inputs: ClassValue[]) => {
	return merge(clsx(inputs));
};
