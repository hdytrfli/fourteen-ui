import * as React from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { cn } from '@/libs/utils';

interface ScrollProgressProps extends React.ComponentProps<'button'> {
	size?: number;
	stroke?: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
	size = 36,
	stroke = 2,
	className,
	...rest
}) => {
	const progress = useScrollProgress();

	const radius = (size - stroke) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference * (1 - progress);

	const handleClick = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<button
			onClick={handleClick}
			className={cn(
				'focus:outline-none select-none',
				'flex items-center justify-center',
				'text-showcase group cursor-pointer',
				className
			)}
			{...rest}>
			<ArrowUp size={16} className='absolute text-foreground' style={{ strokeWidth: stroke }} />
			<svg
				fill='none'
				width={size}
				height={size}
				stroke='currentColor'
				strokeWidth={stroke}
				strokeLinecap='round'>
				<circle cx={size / 2} cy={size / 2} r={radius} />
				<circle
					r={radius}
					cx={size / 2}
					cy={size / 2}
					strokeDashoffset={offset}
					className='text-foreground'
					strokeDasharray={circumference}
					style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
				/>
			</svg>
		</button>
	);
};
