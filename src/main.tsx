import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/libs/fonts';
import '@/index.css';

import Router from '@/router';

const element = document.getElementById('root');
if (!element) throw new Error('Root element not found');

const root = createRoot(element);
root.render(
	<StrictMode>
		<Router />
	</StrictMode>
);
