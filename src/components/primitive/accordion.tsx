import * as React from 'react';
import { ChevronDown, type LucideIcon } from 'lucide-react';

import { cn } from '@/libs/utils';
import { useAccordion } from '@/hooks/use-accordion';
import { AnimatedHeight } from '@/components/primitive/animated-height';

interface AccordionProps extends React.ComponentProps<'div'> {
	initial?: string;
	children: React.ReactNode;
	type: 'single' | 'multiple';
}

/**
 * Accordion root that manages open/close state for items.
 */
export const Accordion = ({ initial, children, type, className, ...rest }: AccordionProps) => {
	const { value, values, onToggle } = useAccordion({ type, initial });

	const check = (items: string) => {
		return type === 'single' ? value === items : values.includes(items);
	};

	return (
		<div className={cn('w-full divide-y divide-dashed', className)} {...rest}>
			{React.Children.map(children, (child) => {
				if (!React.isValidElement<AccordionItemProps>(child)) return child;
				return React.cloneElement(child, {
					handleToggle: onToggle,
					open: check(child.props.value),
					value: child.props.value,
				});
			})}
		</div>
	);
};

interface AccordionItemProps extends React.ComponentProps<'div'> {
	value: string;
	title: string;
	open?: boolean;
	icon?: LucideIcon;
	disabled?: boolean;
	children: React.ReactNode;
	handleToggle?: (value: string) => void;
}

/**
 * A single accordion item with expandable content.
 */
export const AccordionItem = ({
	open,
	value,
	title,
	children,
	className,
	icon: Icon,
	handleToggle,
	disabled = false,
	...rest
}: AccordionItemProps) => {
	const handleClick = () => !disabled && handleToggle?.(value);
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (disabled) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
	};

	return (
		<div className={className} {...rest}>
			<button
				disabled={disabled}
				aria-expanded={open}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				className={cn(
					'p-4 text-left text-foreground',
					'w-full flex items-center justify-between',
					'cursor-pointer disabled:cursor-not-allowed disabled:text-muted',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
				)}>
				<span className='flex items-center gap-3'>
					{Icon && <Icon size={18} aria-hidden />}
					{title}
				</span>
				<ChevronDown
					size={16}
					aria-hidden
					className={cn('transition-transform duration-300 ease-in-out', {
						'rotate-180': open,
					})}
				/>
			</button>
			<AnimatedHeight open={open || false}>
				<div className='p-4 pt-0 text-text'>{children}</div>
			</AnimatedHeight>
		</div>
	);
};
