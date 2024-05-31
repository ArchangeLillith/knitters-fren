import React from "react";
import { Link } from "react-router-dom";

interface NavBarProps {}

const NavBar = (props: NavBarProps) => {
	return (
		<nav className="navbar sticky-top navbar-expand-lg navbar-light bg-bright ">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Knitting Fren
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
					</ul>
					<form className="d-flex">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-primary text-white" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
};

{
	/*
			<Link className="px-7 py-3" to="/patterns/new">
				Add Pattern
			</Link>
			<Link className="px-7 py-3" to="/admin">
				Admin Panel(?)
			</Link>
		</div> */
}
export default NavBar;
