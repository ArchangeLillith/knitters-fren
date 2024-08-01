import React from "react";
import { Link } from "react-router-dom";

interface NavBarProps {
}

const NavBar = (props: NavBarProps) => {

	return (
		<nav
			style={{ fontFamily: "Garamond, serif", fontSize: "24px" }}
			className="navbar sticky-top navbar-expand-lg navbar-light bg-navbar "
		>
			<div className="container-fluid">
				<Link
					className="navbar-brand "
					to="/"
					style={{
						fontFamily: "'Brush Script MT', cursive",
						fontSize: "30px",
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
								Search
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
