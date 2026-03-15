import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { cn } from '@/libs/utils';
import { useDropdown } from '@/hooks/use-dropdown';

interface Props extends React.ComponentProps<'div'> {
	children: React.ReactNode;
}

/**
 * Dropdown panel that portals to document.body to escape stacking context issues.
 * @param children - DropdownItem components
 */
export const DropdownContent = ({ children, className, ...rest }: Props) => {
	const { open, anchor } = useDropdown();
	const ref = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		const el = ref.current;
		const container = anchor.current;
		if (!el || !container) return;

		const { bottom, left } = container.getBoundingClientRect();
		Object.assign(el.style, {
			top: bottom + window.scrollY + 8 + 'px',
			left: left + window.scrollX + 'px',
		});
	}, [open, anchor]);

	return ReactDOM.createPortal(
		<div
			ref={ref}
			aria-hidden={!open}
			className={cn(
				'absolute z-50',
				'w-fit min-w-40 p-1',
				'rounded-xl bg-background',
				'border border-zinc-800',
				{
					'visible pointer-events-auto': open,
					'invisible pointer-events-none': !open,
				},
				className
			)}
			{...rest}>
			{children}
		</div>,
		document.body
	);
};
