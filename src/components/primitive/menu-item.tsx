import * as React from 'react';
import { cn } from '@/libs/utils';
import { type LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { AnimatedHeight } from '@/components/primitive/animated-height';
import type { ClassValue } from 'clsx';
import type { IconPosition } from '@/libs/types';

type Variant = 'primary' | 'destructive';

interface Props extends React.ComponentProps<'li'> {
	label: string;
	icon?: LucideIcon;
	variant?: Variant;
	position?: IconPosition;
	children?: React.ReactNode;
	submenuRef?: React.Ref<HTMLUListElement>;
	onExpand?: (open: boolean) => void;
}

const variants: Record<Variant, ClassValue> = {
	primary: 'text-text hover:bg-border hover:text-foreground',
	destructive: 'text-text hover:bg-destructive hover:text-foreground',
} as const;

const positions: Record<IconPosition, ClassValue> = {
	start: 'flex-row',
	end: 'flex-row-reverse',
} as const;

/**
 * A menu item that can optionally contain a submenu.
 * Click to expand/collapse the submenu.
 * @param label - Display text for the item
 * @param icon - Optional Lucide icon component
 * @param variant - Visual style variant ('primary' or 'destructive')
 * @param position - Whether the icon sits at the 'start' or 'end' (default: 'start')
 * @param children - Optional MenuItem components for submenu
 * @param submenuRef - Optional ref to attach to the submenu ul for animation
 * @param onExpand - Optional callback when submenu open state changes
 */
export const MenuItem = ({
	label,
	children,
	className,
	submenuRef,
	onExpand,
	icon: Icon,
	variant = 'primary',
	position = 'start',
	...rest
}: Props) => {
	const [expand, setExpand] = React.useState(false);

	const previous = React.useRef(expand);
	const submenu = React.Children.count(children) > 0;
	const local = React.useRef<HTMLUListElement>(null);
	const ref = (submenuRef as React.RefObject<HTMLUListElement>) || local;

	const toggle = () => {
		if (submenu) setExpand((prev) => !prev);
	};

	React.useEffect(() => {
		if (submenu && previous.current !== expand) {
			previous.current = expand;
			onExpand?.(expand);
		}
	}, [expand, submenu, onExpand]);

	return (
		<li className='flex flex-col gap-1' {...rest}>
			<button
				onClick={toggle}
				aria-expanded={submenu ? expand : undefined}
				className={cn(
					'gap-3 p-3 w-full',
					'flex items-center',
					'text-sm font-medium',
					'rounded-lg cursor-pointer',
					'focus-visible:ring-2 focus-visible:ring-accent outline-none',
					variants[variant],
					positions[position],
					className
				)}>
				{Icon && <Icon size={16} aria-hidden />}
				<span className='flex-1 text-left'>{label}</span>
				{submenu && (
					<ChevronRight
						size={16}
						aria-hidden
						className={cn('transition-transform duration-300', {
							'rotate-90': expand,
						})}
					/>
				)}
			</button>
			{submenu && (
				<AnimatedHeight open={expand}>
					<ul
						ref={ref}
						className={cn(
							'ml-4 pl-2',
							'flex flex-col gap-1',
							'border-l border-border border-dashed'
						)}>
						{children}
					</ul>
				</AnimatedHeight>
			)}
		</li>
	);
};
