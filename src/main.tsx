import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/libs/fonts';
import '@/index.css';

import Router from '@/router';
import { SharedTooltipProvider } from '@/components/collections/tooltip/shared-tooltip';
import { LenisProvider } from '@/providers/lenis-provider';

const element = document.getElementById('root');
if (!element) throw new Error('Root element not found');

const root = createRoot(element);
root.render(
	<StrictMode>
		<LenisProvider>
			<SharedTooltipProvider>
				<Router />
			</SharedTooltipProvider>
		</LenisProvider>
	</StrictMode>
);
