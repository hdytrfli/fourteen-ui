import { PLACEMENTS } from '@/libs/constants';

export type IconPosition = 'start' | 'end';
export type Placement = (typeof PLACEMENTS)[number]['id'];

export interface Position {
	top: number;
	left: number;
}
