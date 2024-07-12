//npm run dev to start the project in dev mode
//server on 3000
//frontend on 8000

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { ToastContainer } from "react-toastify";
import NavBar from "../components/NavBar";
import AppRoutes from "./AppRoutes";
import Footer from "../components/Footer";

interface AppProps {}

const App = (props: AppProps) => {
	// const [data, setData] = useState("");

	// useEffect(() => {
	// 	fetch("http://localhost:3000/api/hello")
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.message))
	// 		.catch((e) => console.log("[fetch erorr]", e));
	// }, []);

	return (
		<BrowserRouter>
			<AuthProvider>
				<ToastContainer
					position="bottom-right"
					autoClose={3000}
					draggable={false}
					pauseOnHover={true}
				/>
				<NavBar />
				<AppRoutes />
			</AuthProvider>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
