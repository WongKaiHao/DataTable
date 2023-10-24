import { Route, Routes, useLocation } from "react-router-dom";
import { ROUTES } from "./routes.js";
import { useEffect } from "react";

const AppRouter = () => {
	const location = useLocation();

	useEffect(() => {
		const route = ROUTES.find((r) => r.path === location.pathname);

		if (route) {
			document.title = `${route.name}`;
		}
	}, [location.pathname]);

	return (
		<div>
			<Routes>
				{ROUTES.map((route, index) => (
					<Route key={index} path={route.path} element={<route.component />} />
				))}
			</Routes>
		</div>
	);
};

export default AppRouter;
