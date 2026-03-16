import {
	Pencil,
	Trash,
	Download,
	ArrowUpRight,
	Mail,
	Settings,
	Star,
	Share2,
	Heart,
	Bookmark,
	Copy,
	Link,
} from 'lucide-react';

import { Avatar } from '@/components/primitive/avatar';
import { Button } from '@/components/primitive/button';
import { Gallery } from '@/components/primitive/gallery';
import { Tooltip } from '@/components/primitive/tooltip';
import { Showcase } from '@/components/primitive/showcase';
import { TooltipContent } from '@/components/primitive/tooltip-content';
import { FadeTooltip } from '@/components/collections/tooltip/fade-tooltip';
import { ScaleTooltip } from '@/components/collections/tooltip/scale-tooltip';
import { BlurTooltip } from '@/components/collections/tooltip/blur-tooltip';

export const TooltipCollection = () => {
	return (
		<Gallery title='Tooltip' description='A collection of tooltip components.'>
			<Showcase label='Plain tooltip'>
				<div className='flex gap-3'>
					<Tooltip>
						<Button variant='primary'>
							<Pencil size={16} />
						</Button>
						<TooltipContent placement='top-center'>Edit item</TooltipContent>
					</Tooltip>
					<Tooltip>
						<Button variant='secondary'>
							<Trash size={16} />
						</Button>
						<TooltipContent placement='top-center'>Delete item</TooltipContent>
					</Tooltip>
					<Tooltip>
						<Button variant='destructive'>
							<Download size={16} />
						</Button>
						<TooltipContent placement='top-center'>Download file</TooltipContent>
					</Tooltip>
				</div>
			</Showcase>

			<Showcase label='Long trigger and content tooltip' className='col-span-2'>
				<div className='flex gap-3'>
					<Tooltip>
						<Button variant='secondary'>Long tooltip trigger</Button>
						<TooltipContent>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</TooltipContent>
					</Tooltip>
				</div>
			</Showcase>

			<Showcase label='Different placements' className='col-span-2'>
				<div className='flex gap-3'>
					<Tooltip>
						<Button variant='secondary'>Left</Button>
						<TooltipContent placement='left-center'>Left tooltip</TooltipContent>
					</Tooltip>
					<Tooltip>
						<Button variant='secondary'>Top</Button>
						<TooltipContent placement='top-center'>Top tooltip</TooltipContent>
					</Tooltip>
					<Tooltip>
						<Button variant='secondary'>Bottom</Button>
						<TooltipContent placement='bottom-center'>Bottom tooltip</TooltipContent>
					</Tooltip>
					<Tooltip>
						<Button variant='secondary'>Right</Button>
						<TooltipContent placement='right-center'>Right tooltip</TooltipContent>
					</Tooltip>
				</div>
			</Showcase>

			<Showcase label='Custom content tooltip'>
				<Tooltip>
					<Button variant='secondary'>
						<Pencil size={16} />
					</Button>
					<TooltipContent placement='top-center' className='max-w-sm text-sm text-start p-4'>
						<div className='flex items-center gap-3'>
							<Avatar
								alt='Avatar'
								className='flex-none'
								src='https://picsum.photos/seed/img1/400/300'
							/>
							<div className='flex flex-col flex-none'>
								<span className='font-semibold'>John Doe</span>
								<span className='text-zinc-500'>johndoe@example.com</span>
							</div>
						</div>
					</TooltipContent>
				</Tooltip>
			</Showcase>

			<Showcase label='Fade tooltip'>
				<div className='flex gap-3'>
					<Tooltip>
						<Button variant='secondary'>
							<Star size={16} />
						</Button>
						<FadeTooltip placement='top-center'>Add to favorites</FadeTooltip>
					</Tooltip>
					<Tooltip>
						<Button variant='secondary'>
							<Share2 size={16} />
						</Button>
						<FadeTooltip placement='top-center'>Share this</FadeTooltip>
					</Tooltip>
					<Tooltip>
						<Button variant='secondary'>
							<Bookmark size={16} />
						</Button>
						<FadeTooltip placement='top-center'>Save for later</FadeTooltip>
					</Tooltip>
				</div>
			</Showcase>

			<Showcase label='Scale tooltip'>
				<div className='flex gap-3'>
					<Tooltip>
						<Button variant='secondary'>
							<Heart size={16} />
						</Button>
						<ScaleTooltip placement='top-center'>Like this</ScaleTooltip>
					</Tooltip>
					<Tooltip>
						<Button variant='secondary'>
							<Copy size={16} />
						</Button>
						<ScaleTooltip placement='top-center'>Copy link</ScaleTooltip>
					</Tooltip>
					<Tooltip>
						<Button variant='secondary'>
							<Link size={16} />
						</Button>
						<ScaleTooltip placement='top-center'>Get link</ScaleTooltip>
					</Tooltip>
				</div>
			</Showcase>

			<Showcase label='Blur tooltip'>
				<div className='flex gap-3'>
					<Tooltip>
						<Button variant='secondary'>
							<ArrowUpRight size={16} />
						</Button>
						<BlurTooltip placement='top-center'>Open link</BlurTooltip>
					</Tooltip>
					<Tooltip>
						<Button variant='secondary'>
							<Mail size={16} />
						</Button>
						<BlurTooltip placement='top-center'>Send email</BlurTooltip>
					</Tooltip>
					<Tooltip>
						<Button variant='secondary'>
							<Settings size={16} />
						</Button>
						<BlurTooltip placement='top-center'>Open settings</BlurTooltip>
					</Tooltip>
				</div>
			</Showcase>
		</Gallery>
	);
};
