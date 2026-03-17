import * as React from 'react';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { MenuItem } from '@/components/primitive/menu-item';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import type { ClassValue } from 'clsx';
import type { IconPosition } from '@/libs/types';

type Variant = 'primary' | 'destructive';

interface Props extends React.ComponentProps<typeof MenuItem> {
	label: string;
	icon?: LucideIcon;
	variant?: Variant;
	position?: IconPosition;
	children?: React.ReactNode;
}

/**
 * Menu item with fade animation on submenu expand.
 * @param label - Display text for the item
 * @param icon - Optional Lucide icon component
 * @param variant - Visual style variant ('primary' or 'destructive')
 * @param position - Whether the icon sits at the 'start' or 'end' (default: 'start')
 * @param children - Optional FadeMenuItem components for submenu
 */
export const FadeMenuItem = ({
	label,
	variant = 'primary',
	position = 'start',
	icon: Icon,
	children,
	className,
	...rest
}: Props) => {
	const [open, setOpen] = React.useState(false);
	const hasSubmenu = React.Children.count(children) > 0;
	const submenuRef = React.useRef<HTMLUListElement>(null);

	const toggle = () => {
		if (hasSubmenu) setOpen((prev) => !prev);
	};

	const variants: Record<Variant, ClassValue> = {
		primary: 'text-text hover:bg-border hover:text-foreground',
		destructive: 'text-text hover:bg-rose-700 hover:text-foreground',
	};

	const positions: Record<IconPosition, ClassValue> = {
		start: 'flex-row',
		end: 'flex-row-reverse',
	};

	React.useLayoutEffect(() => {
		const el = submenuRef.current;
		if (!el || !hasSubmenu) return;

		if (open) {
			gsap.fromTo(
				el,
				{ opacity: VALUES.hidden },
				{ opacity: VALUES.visible, duration: DURATION.base, ease: EASE.default }
			);
		}
	}, [open, hasSubmenu]);

	return (
		<li className='flex flex-col gap-1' {...rest}>
			<button
				onClick={toggle}
				aria-expanded={hasSubmenu ? open : undefined}
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
				{hasSubmenu && (
					<ChevronRight
						size={16}
						aria-hidden
						className={cn('transition-transform duration-300', {
							'rotate-90': open,
						})}
					/>
				)}
			</button>
			{hasSubmenu && (
				<ul
					ref={submenuRef}
					className={cn('flex flex-col gap-1 ml-4 pl-2 border-l border-border border-dashed', {
						hidden: !open,
					})}>
					{children}
				</ul>
			)}
		</li>
	);
};
