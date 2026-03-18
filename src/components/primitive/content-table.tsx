import * as React from 'react';

import { cn } from '@/libs/utils';
import { Link } from 'react-router';
import { useHeadingObserver } from '@/hooks/use-heading-observer';

type TOCLevel = 1 | 2 | 3 | 4 | 5;

interface TocItem {
	id: string;
	text: string;
	level: TOCLevel;
	children?: TocItem[];
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
export const ContentTable = ({ container, selector = 'h2, h3', className, ...rest }: Props) => {
	const [headings, setHeadings] = React.useState<TocItem[]>([]);

	const active = useHeadingObserver({
		headings: headings.map((heading) => {
			return heading.id;
		}),
	});

	React.useEffect(() => {
		const content = container.current;
		if (!content) return;

		const elements = content.querySelectorAll<HTMLElement>(selector);
		const item: TocItem[] = [];

		elements.forEach((element) => {
			if (!element.id) return;
			const level = parseInt(element.tagName.charAt(1), 10) as TOCLevel;
			item.push({
				id: element.id,
				text: element.textContent,
				level,
			});
		});

		setHeadings(item);
	}, [container, selector]);

	if (headings.length === 0) return null;

	const levels: Record<TOCLevel, string> = {
		1: 'ml-2',
		2: 'ml-2',
		3: 'ml-4',
		4: 'ml-8',
		5: 'ml-12',
	} as const;

	return (
		<nav className={cn('flex flex-col gap-2', className)} {...rest}>
			<h4 className='text-sm font-medium text-foreground mb-2'>Table of Contents</h4>
			<ul className='flex flex-col gap-2'>
				{headings.map((item) => (
					<li key={item.id}>
						<Link
							to={'#' + item.id}
							className={cn(
								levels[item.level],
								'text-muted hover:pl-4',
								'no-underline block text-sm',
								'transition-all duration-300 hover:text-text',
								{ 'pl-4 text-foreground font-medium': active === item.id }
							)}
							onClick={(e) => {
								e.preventDefault();
								const element = document.getElementById(item.id);
								if (element) element.scrollIntoView({ behavior: 'smooth' });
							}}>
							{item.text}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
