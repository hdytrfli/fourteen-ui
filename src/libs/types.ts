import { PLACEMENTS } from '@/libs/constants';
import type { LucideIcon } from 'lucide-react';

export type IconPosition = 'start' | 'end';
export type Theme = 'dark' | 'light' | 'system';
export type Placement = (typeof PLACEMENTS)[number]['id'];

export type Position = {
	top: number;
	left: number;
};

export type ThemeItem = {
	label: string;
	value: Theme;
	icon: LucideIcon;
};

export type Config = {
	toc: boolean;
	theme: boolean;
	scrolltop: boolean;
};

export type Navigation = keyof Config;
