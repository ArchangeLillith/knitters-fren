//This file governs how the routes work. We can wrap different routes in private tags here if we want to ensure they're kept safe
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Footer from '../components/LayoutComponents/Footer';
import NavBar from '../components/LayoutComponents/NavBar';
import AddPattern from '../views/AddPattern';
import AdminPanel from '../views/AdminPanel';
import FavoritePatterns from '../views/FavoritePatterns';
import Gallery from '../views/Gallery';
import Home from '../views/Home';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import PatternDetails from '../views/PatternDetails';
import Patterns from '../views/Patterns';
import Register from '../views/Register';
import SearchView from '../views/SearchView';
import UpdatePattern from '../views/UpdatePattern';

const App = () => {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/gallery" element={<Gallery />}></Route>
				<Route path="/patterns" element={<Patterns />}></Route>
				<Route path="/favorites" element={<FavoritePatterns />}></Route>
				<Route path="/search" element={<SearchView />}></Route>
				<Route path="/admin" element={<AdminPanel />}></Route>
				<Route path="/patterns/:id" element={<PatternDetails />}></Route>
				<Route path="/patterns/new" element={<AddPattern />}></Route>
				<Route path="/patterns/admin" element={<AdminPanel />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/patterns/:id/update" element={<UpdatePattern />}></Route>s
				<Route path="/*" element={<NotFound />}></Route>
			</Routes>
			<Footer />
		</>
	);
};

export default App;
