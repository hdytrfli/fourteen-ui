import * as React from 'react';

import { cn } from '@/libs/utils';

interface Props extends React.ComponentProps<'input'> {
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
}

/**
 * Switch toggle component for boolean inputs.
 * @param checked - Controlled checked state
 * @param defaultChecked - Uncontrolled default checked state
 * @param onCheckedChange - Callback when checked state changes
 * @param disabled - Whether the switch is disabled
 */
export const Switch = ({
	checked: controlledChecked,
	defaultChecked,
	onCheckedChange,
	disabled = false,
	className,
	...rest
}: Props) => {
	const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked ?? false);
	const checked = controlledChecked ?? uncontrolledChecked;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newChecked = e.target.checked;
		setUncontrolledChecked(newChecked);
		onCheckedChange?.(newChecked);
	};

	return (
		<label
			className={cn(
				'relative inline-flex items-center cursor-pointer',
				disabled && 'cursor-not-allowed opacity-50'
			)}>
			<input
				type='checkbox'
				checked={checked}
				disabled={disabled}
				onChange={handleChange}
				className={cn('sr-only peer', className)}
				{...rest}
			/>
			<div
				className={cn(
					"after:content-['']",
					'after:bg-light',
					'w-10 h-6 rounded-full',
					'peer-checked:bg-accent',
					'after:size-4 after:rounded-full',
					'peer-checked:after:translate-x-4',
					'after:absolute after:top-1 after:left-1',
					'transition-colors duration-200 ease-in-out',
					'after:transition-transform after:duration-200 after:ease-in-out',
					'bg-ghost peer-focus-visible:ring-2 peer-focus-visible:ring-accent'
				)}
			/>
		</label>
	);
};
