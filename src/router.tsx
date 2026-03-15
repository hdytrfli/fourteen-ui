import { BrowserRouter, Route, Routes } from 'react-router';

import App from '@/pages/app.tsx';

export default function Router(): React.JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
			</Routes>
		</BrowserRouter>
	);
}
