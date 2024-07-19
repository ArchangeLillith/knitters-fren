//This file governs how the routes work. We can wrap different routes in private tags here if we want to ensure they're kept safe

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Patterns from "../views/Patterns";
import PatternDetails from "../views/PatternDetails";
import AddPattern from "../views/AddPattern";
import UpdatePattern from "../views/UpdatePattern";
import NotFound from "../views/NotFound";
import AdminPanel from "../views/AdminPanel";
import SearchView from "../views/SearchView";
import search from "../services/search";
import NavBar from "../components/NavBar";

interface AppProps {}

const App = (props: AppProps) => {
	const [searchResults, setSearchResults] = useState([]);
	const [searchText, setSearchText] = useState<string>("");
	const [searchType, setSearchType] = useState<string>("title");

	useEffect(() => {
		if (searchText) {
			search
				.getByTitle(searchText)
				.then((response) => response.json())
				.then((data) => {
					setSearchResults(data.results);
				});
		}
	}, [searchText, searchType]);

	return (
		<div>
			<NavBar
				searchText={searchText}
				setSearchText={setSearchText}
				searchType={searchType}
				setSearchType={setSearchType}
			/>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/patterns" element={<Patterns />}></Route>
				<Route
					path="/search"
					element={
						<SearchView
							patterns={searchResults}
							keyword={searchText}
							searchType={searchType}
						/>
					}
				></Route>
				<Route path="/patterns/:id" element={<PatternDetails />}></Route>
				<Route path="/patterns/new" element={<AddPattern />}></Route>
				<Route path="/patterns/admin" element={<AdminPanel />}></Route>
				<Route path="/patterns/:id/update" element={<UpdatePattern />}></Route>
				<Route path="/*" element={<NotFound />}></Route>
			</Routes>
		</div>
	);
};

export default App;
