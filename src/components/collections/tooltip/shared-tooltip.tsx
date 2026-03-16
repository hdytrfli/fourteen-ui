import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { gsap } from 'gsap';
import { cn } from '@/libs/utils';
import { DURATION, EASE } from '@/libs/constants';
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
	const ref = React.useRef<HTMLDivElement>(null);
	const id = React.useId();

	React.useLayoutEffect(() => {
		register(id, label);
		return () => unregister(id);
	}, [id, label, register, unregister]);

	return (
		<div
			ref={ref}
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
	const container = React.useRef<HTMLDivElement>(null);
	const content = React.useRef<HTMLDivElement>(null);
	const timer = React.useRef<number | null>(null);
	const [label, setLabel] = React.useState('');
	const { x, y } = useMousePosition();
	const visible = React.useRef(false);

	React.useLayoutEffect(() => {
		gsap.set(container.current, { opacity: 0 });
	}, []);

	React.useLayoutEffect(() => {
		const el = container.current;
		if (!el) return;

		const gap = 6;

		Object.assign(el.style, {
			left: x + 'px',
			top: y - gap + 'px',
			transform: 'translate(-50%, -100%)',
		});
	}, [x, y]);

	const show = React.useCallback(
		(id: string) => {
			if (timer.current) {
				window.clearTimeout(timer.current);
				timer.current = null;
			}

			const newLabel = triggers.current.get(id);
			if (!newLabel) return;

			const el = container.current;
			const inner = content.current;
			if (!el || !inner) return;

			if (label && newLabel !== label) {
				gsap.to(inner, {
					yPercent: -100,
					opacity: 0,
					duration: DURATION.base,
					ease: EASE.out,
					onComplete: () => {
						setLabel(newLabel);
						gsap.fromTo(
							inner,
							{ yPercent: 100, opacity: 0 },
							{
								yPercent: 0,
								opacity: 1,
								duration: DURATION.base,
								ease: EASE.out,
							}
						);
					},
				});
			} else if (!label) {
				gsap.set(el, { visibility: 'visible' });
				gsap.set(inner, { yPercent: 0, opacity: 0 });
				gsap.to(el, { opacity: 1, duration: DURATION.base, ease: EASE.out });
				gsap.to(inner, { opacity: 1, duration: DURATION.base, ease: EASE.out });
				visible.current = true;
				setLabel(newLabel);
			}
		},
		[label]
	);

	const hide = React.useCallback(() => {
		timer.current = window.setTimeout(() => {
			const el = container.current;
			if (!el) return;

			gsap.to(el, {
				opacity: 0,
				duration: DURATION.fast,
				ease: EASE.default,
			});
			visible.current = false;
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
					ref={container}
					className={cn(
						'fixed z-50 pointer-events-none',
						'px-4 py-2 rounded-full',
						'bg-background border border-border',
						'text-xs text-foreground',
						'max-w-48 wrap-break-words'
					)}>
					<div ref={content}>{label}</div>
				</div>,
				document.body
			)}
		</TooltipContext.Provider>
	);
};
