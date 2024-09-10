//npm run dev to start the project in dev mode
//server on 3000
//frontend on 8000

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoutes";
import Footer from "../components/Footer";

interface AppProps {}

const App = (props: AppProps) => {
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
