//This file governs how the routes work. We can wrap different routes in private tags here if we want to ensure they're kept safe
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../views/Home";
import Patterns from "../views/Patterns";
import PatternDetails from "../views/PatternDetails";
import AddPattern from "../views/AddPattern";
import UpdatePattern from "../views/UpdatePattern";
import NotFound from "../views/NotFound";
import AdminPanel from "../views/AdminPanel";
import Register from "../views/Register";
import Login from "../views/Login";
import SearchView from "../views/SearchView";

import NavBar from "../components/NavBar";
import FavoritePatterns from "../views/FavoritePatterns";

interface AppProps {}

const App = (props: AppProps) => {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/patterns" element={<Patterns />}></Route>
				<Route path="/favorites" element={<FavoritePatterns />}></Route>
				<Route path="/search" element={<SearchView />}></Route>
				<Route path="/admin" element={<AdminPanel />}></Route>
				<Route path="/patterns/:id" element={<PatternDetails />}></Route>
				<Route path="/patterns/new" element={<AddPattern />}></Route>
				<Route path="/patterns/admin" element={<AdminPanel />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/patterns/:id/update" element={<UpdatePattern />}></Route>
				<Route path="/*" element={<NotFound />}></Route>
			</Routes>
		</div>
	);
};

export default App;
