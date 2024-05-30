//npm run dev to start the project in dev mode
//server on 3000
//frontend on 8000

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../views/Home";
import Patterns from "../views/Patterns";
import PatternDetails from "../views/PatternDetails";
import AddPattern from "../views/AddPattern";
import UpdatePattern from "../views/UpdatePattern";
import NotFound from "../views/NotFound";

interface AppProps {}

const App = (props: AppProps) => {
	const [data, setData] = useState("");

	// useEffect(() => {
	// 	fetch("http://localhost:3000/api/hello")
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.message))
	// 		.catch((e) => console.log("[fetch erorr]", e));
	// }, []);

	return (
		<BrowserRouter>
		<div className="px-7 py-3">
			<Link className="px-7 py-3" to="/">Home</Link>
			<Link className="px-7 py-3" to="/patterns">Patterns</Link>
			<Link className="px-7 py-3" to="/patterns/new">Add Pattern</Link>
			<Link className="px-7 py-3" to="/patterns/new">Admin Panel(?)</Link>
		</div>
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/patterns" element={<Patterns />}></Route>
			<Route path="/patterns/:id" element={<PatternDetails />}></Route>
			<Route path="/patterns/new" element={<AddPattern />}></Route>
			<Route path="/patterns/update" element={<UpdatePattern />}></Route>
			<Route path="/*" element={<NotFound />}></Route>
		</Routes>
		
		</BrowserRouter>
	);
};

export default App;
