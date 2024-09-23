//npm run dev to start the project in dev mode
//frontend on 8000
//server on 3000

import React from "react";
import AppRoutes from "./AppRoutes";
import AuthProvider from "../components/AuthComponents/AuthProvider";
import { BrowserRouter } from "react-router-dom";

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
