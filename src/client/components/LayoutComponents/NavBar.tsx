import React, { useContext } from 'react';
import { TfiSearch } from 'react-icons/tfi';
import { Link, useNavigate } from 'react-router-dom';

import storage from '../../utils/storage';
import { AuthContext } from '../AuthComponents/AuthProvider';

const NavBar = () => {
	const { logoutFromAuthState } = useContext(AuthContext);
	const navigate = useNavigate();
	const { authState } = useContext(AuthContext);
	const { authorData } = authState;

	/**
	 * Logs the user out by removing the token and calling to the auth state to reset the state
	 */
	const logOut = () => {
		try {
			storage.removeToken();
			logoutFromAuthState();
			navigate(`/`);
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	return (
		<nav
			style={{ fontFamily: 'Garamond, serif', fontSize: '24px' }}
			className="navbar sticky-top navbar-expand-lg navbar-light bg-navbar "
		>
			<div className="container-fluid">
				<Link
					className="navbar-brand"
					to="/"
					style={{
						fontFamily: "'Brush Script MT', cursive",
						fontSize: '30px',
					}}
				>
					Knitters Fren
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarText"
					aria-controls="navbarText"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/" className="nav-link" aria-current="page">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/patterns" className="nav-link">
								Patterns
							</Link>
						</li>
						{authState.authenticated && (
							<li className="nav-item text-soft">
								<Link to="/favorites" className="nav-link">
									Favorites
								</Link>
							</li>
						)}
						<li className="nav-item">
							<Link to="/patterns/new" className="nav-link">
								Create a Pattern
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/gallery" className="nav-link">
								Gallery
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/search" className="nav-link">
								<TfiSearch />
							</Link>
						</li>
					</ul>
					{authorData?.username && (
						<div className="me-3 text-soft">
							<div>Welcome back {authorData?.username}!</div>
						</div>
					)}
					{authState.authenticated && (
						<div className="me-3">
							<button onClick={logOut} className="nav-link">
								Log out
							</button>
						</div>
					)}
					{authorData?.role === 'admin' && (
						<div>
							<Link to="/admin">Admin Panel</Link>
						</div>
					)}
					{!authState.authenticated && (
						<div>
							<Link to="/login" className="nav-link">
								Login!
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
