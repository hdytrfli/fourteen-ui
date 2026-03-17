import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE, VALUES } from '@/libs/constants';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { TooltipContext } from '@/hooks/use-shared-tooltip';

interface TriggerProps extends React.ComponentProps<'div'> {
	label: string;
}

/**
 * Wraps an element to make it a shared tooltip trigger.
 */
export const SharedTooltipTrigger = ({ label, children, className, ...rest }: TriggerProps) => {
	const { register, unregister, show, hide } = React.useContext(TooltipContext)!;
	const triggerRef = React.useRef<HTMLDivElement>(null);
	const id = React.useId();

	React.useLayoutEffect(() => {
		register(id, label);
		return () => unregister(id);
	}, [id, label, register, unregister]);

	return (
		<div
			ref={triggerRef}
			className={cn('w-fit', className)}
			onMouseEnter={() => show(id)}
			onMouseLeave={hide}
			{...rest}>
			{children}
		</div>
	);
};

interface ProviderProps {
	children: React.ReactNode;
}

/**
 * Shared tooltip provider with smooth text swap animations.
 */
export const SharedTooltipProvider = ({ children }: ProviderProps) => {
	const triggers = React.useRef<Map<string, string>>(new Map());
	const containerRef = React.useRef<HTMLDivElement>(null);
	const contentRef = React.useRef<HTMLDivElement>(null);
	const timerRef = React.useRef<number | null>(null);
	const [label, setLabel] = React.useState('');
	const { x, y } = useMousePosition();

	React.useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		gsap.set(container, { opacity: 0 });
	}, []);

	React.useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const gap = 6;

		Object.assign(container.style, {
			left: x + 'px',
			top: y - gap + 'px',
			transform: 'translate(-50%, -100%)',
		});
	}, [x, y]);

	const show = React.useCallback(
		(id: string) => {
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
				timerRef.current = null;
			}

			const newLabel = triggers.current.get(id);
			if (!newLabel) return;

			const container = containerRef.current;
			const content = contentRef.current;
			if (!container || !content) return;

			if (label && newLabel !== label) {
				const states = {
					exit: { yPercent: -100, opacity: VALUES.hidden, ease: EASE.default },
					enter: { yPercent: VALUES.zero, opacity: VALUES.visible, ease: EASE.default },
				} as const;

				gsap.to(content, {
					...states.exit,
					duration: DURATION.base,
					onComplete: () => {
						setLabel(newLabel);
						gsap.fromTo(
							content,
							{ yPercent: 100, opacity: VALUES.hidden },
							{
								...states.enter,
								duration: DURATION.base,
							}
						);
					},
				});
			} else if (!label) {
				const states = {
					enter: { opacity: VALUES.visible, ease: EASE.default },
					initial: { yPercent: VALUES.zero, opacity: VALUES.hidden },
				} as const;

				gsap.set(container, { visibility: 'visible' });
				gsap.set(content, states.initial);
				gsap.to(container, { ...states.enter, duration: DURATION.base });
				gsap.to(content, { ...states.enter, duration: DURATION.base });
				setLabel(newLabel);
			}
		},
		[label]
	);

	const hide = React.useCallback(() => {
		timerRef.current = window.setTimeout(() => {
			const container = containerRef.current;
			if (!container) return;

			gsap.to(container, {
				opacity: VALUES.hidden,
				duration: DURATION.fast,
				ease: EASE.default,
			});
			setLabel('');
		}, 100);
	}, []);

	const register = React.useCallback((id: string, newLabel: string) => {
		triggers.current.set(id, newLabel);
	}, []);

	const unregister = React.useCallback((id: string) => {
		triggers.current.delete(id);
	}, []);

	return (
		<TooltipContext.Provider value={{ register, unregister, show, hide }}>
			{children}
			{ReactDOM.createPortal(
				<div
					ref={containerRef}
					className={cn(
						'fixed z-50',
						'pointer-events-none',
						'max-w-48 wrap-break-words',
						'bg-background text-foreground',
						'text-xs font-medium text-center',
						'px-4 py-2 rounded-2xl border border-border'
					)}>
					<div ref={contentRef}>{label}</div>
				</div>,
				document.body
			)}
		</TooltipContext.Provider>
	);
};
