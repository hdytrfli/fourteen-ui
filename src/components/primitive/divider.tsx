import * as React from 'react';
import { cn } from '@/libs/utils';

interface DividerProps extends React.ComponentProps<'hr'> {
	//
}

/**
 * A divider inside a DropdownContent.
 */
export const Divider: React.FC<DividerProps> = ({ className, ...rest }) => {
	return <hr className={cn('flex-1 border-b border-dashed my-1', className)} {...rest} />;
};
