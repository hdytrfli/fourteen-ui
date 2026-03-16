import { BrowserRouter, Route, Routes } from 'react-router';

import { PAGES } from '@/libs/pages';

import App from '@/pages/app.tsx';
import CollectionPage from '@/pages/collection';
import { BaseLayout } from '@/layouts/base.layout';

export default function Router(): React.JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<BaseLayout />}>
					<Route index element={<App />} />
					{PAGES.map(({ path, component: Component, title, desciption }) => (
						<Route
							key={path}
							path={path}
							element={
								<CollectionPage title={title} description={desciption}>
									<Component />
								</CollectionPage>
							}
						/>
					))}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
