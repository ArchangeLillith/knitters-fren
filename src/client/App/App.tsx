//npm run dev to start the project in dev mode
//server on 3000
//frontend on 8000

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../components/AuthComponents/AuthProvider";
import AppRoutes from "./AppRoutes";
import Footer from "../components/LayoutComponents/Footer";

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
