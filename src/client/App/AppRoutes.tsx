//This file governs how the routes work. We can wrap different routes in private tags here if we want to ensure they're kept safe

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Patterns from "../views/Patterns";
import PatternDetails from "../views/PatternDetails";
import AddPattern from "../views/AddPattern";
import UpdatePattern from "../views/UpdatePattern";
import NotFound from "../views/NotFound";
import AdminPanel from "../views/AdminPanel";

interface AppProps {}

const App = (props: AppProps) => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/patterns" element={<Patterns />}></Route>
			<Route path="/patterns/:id" element={<PatternDetails />}></Route>
			<Route path="/patterns/new" element={<AddPattern />}></Route>
			<Route path="/patterns/admin" element={<AdminPanel />}></Route>
			<Route path="/patterns/:id/update" element={<UpdatePattern />}></Route>
			<Route path="/*" element={<NotFound />}></Route>
		</Routes>
	);
};

export default App;
