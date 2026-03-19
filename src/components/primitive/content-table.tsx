import * as React from 'react';
import { Link } from 'react-router';

import { cn } from '@/libs/utils';
import { useHeadingObserver } from '@/hooks/use-heading-observer';

type TOCLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface ContentItem {
	id: string;
	text: string;
	level: TOCLevel;
}

interface Props extends React.ComponentProps<'nav'> {
	selector?: string;
	container: React.RefObject<HTMLElement | null>;
}

/**
 * Table of Contents component that extracts headings from a container ref.
 * @param container - Ref to the container element to scan for headings
 * @param selector - CSS selector for headings to include (default: 'h2, h3')
 */
export const ContentTable = ({ container, selector = 'h2, h3', ...rest }: Props) => {
	const [headings, setHeadings] = React.useState<ContentItem[]>([]);

	const active = useHeadingObserver({
		headings: headings.map((heading) => heading.id),
	});

	React.useEffect(() => {
		const content = container.current;
		if (!content) return;

		const elements = content.querySelectorAll<HTMLElement>(selector);
		const items: ContentItem[] = [];

		elements.forEach((element) => {
			if (!element.id) return;
			const level = parseInt(element.tagName.charAt(1), 10) as TOCLevel;
			items.push({
				id: element.id,
				text: element.textContent,
				level,
			});
		});

		setHeadings(items);
	}, [container, selector]);

	if (headings.length === 0) return null;

	return (
		<nav {...rest}>
			<ul className='flex flex-col group'>
				{headings.map((item) => (
					<li key={item.id} className='text-sm group/item'>
						<ContentItem
							item={item}
							active={active === item.id}
							className={cn(
								'py-0 group-hover:py-2',
								'transition-discrete duration-300 ease-in-out',
								'no-underline flex items-center gap-4'
							)}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
};

type OmittedLink = Omit<React.ComponentProps<typeof Link>, 'to'>;
interface ItemProps extends OmittedLink {
	active: boolean;
	item: ContentItem;
}

/**
 * Table of Contents item component.
 * @param item - Item to render
 * @param active - Whether the item is active
 */
const ContentItem: React.FC<ItemProps> = ({ item, active, ...props }) => {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const element = document.getElementById(item.id) as HTMLElement;
		const rect = element.getBoundingClientRect();
		window.scrollTo({
			top: rect.top + window.scrollY - window.innerHeight * 0.1,
			behavior: 'smooth',
		});
	};

	return (
		<Link to={'#' + item.id} onClick={handleClick} {...props}>
			<div
				className={cn(
					'rounded-full',
					'flex-none h-0.5',
					'group-hover/item:w-10',
					'group-hover/item:bg-foreground',
					'transition-discrete duration-300 ease-in-out',
					{
						'bg-muted w-4': !active,
						'bg-foreground w-10': active,
					}
				)}
			/>
			<span
				className={cn(
					'leading-none font-medium',
					'transition-colors duration-300 ease-in-out',
					'text-transparent group-hover/item:text-foreground',
					{
						'group-hover:text-foreground': active,
						'group-hover:text-muted': !active,
					}
				)}>
				{item.text}
			</span>
		</Link>
	);
};
