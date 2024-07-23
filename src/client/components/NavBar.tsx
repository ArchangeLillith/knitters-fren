import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavBarProps {
	searchText: string;
	//Zach what is the right typing?
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
	searchType: string;
	setSearchType: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar = (props: NavBarProps) => {
	const navigate = useNavigate();
	const updateSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
		navigate("./search");
		props.setSearchText(e.target.value);
	};
	const updateSearchType = (e: any) => {
		props.setSearchType(e.target.value);
		if (props.searchType === "tag") {
			navigate("./search/");
		}
	};
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
					</ul>
					<form className="d-flex">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
							value={props.searchText}
							onChange={updateSearchText}
						/>
						<select
							className="form-select mx-2 w-50"
							aria-label="Default select example"
							onChange={updateSearchType}
						>
							<option defaultValue="title" value="title">
								Title
							</option>
							<option value="tag">Tag</option>
							<option value="author">Author</option>
							<option value="content">Content</option>
						</select>
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
