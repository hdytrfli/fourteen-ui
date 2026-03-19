import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/libs/fonts';
import '@/index.css';

import Router from '@/router';
import { LenisProvider } from '@/providers/lenis-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ConfigProvider } from '@/providers/config-provider';
import { SharedTooltipProvider } from '@/components/collections/tooltip/shared-tooltip';

const element = document.getElementById('root');
if (!element) throw new Error('Root element not found');

const root = createRoot(element);
root.render(
	<StrictMode>
		<ConfigProvider>
			<ThemeProvider>
				<LenisProvider>
					<SharedTooltipProvider>
						<Router />
					</SharedTooltipProvider>
				</LenisProvider>
			</ThemeProvider>
		</ConfigProvider>
	</StrictMode>
);
