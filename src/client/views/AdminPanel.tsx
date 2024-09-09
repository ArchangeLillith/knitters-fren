import React, { useContext, useEffect } from "react";
import { IPattern } from "../utils/types";
import patternService from "../services/pattern";
import PatternCard from "../components/PatternCard";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

const AdminPanel = () => {
	const { authState } = useContext(AuthContext);
	const navigate = useNavigate();
	const [patterns, setPatterns] = React.useState<IPattern[]>([]);

	const handleDelete = (id: string) => {
		//Refactor throw a do you want to delete this? here, a modal probs
		patternService
			.destroyPattern(id)
			.then(() => navigate("/patterns/admin"))
			.catch((error) => alert(error));
	};

	useEffect(() => {
		patternService
			.getAllPatterns()
			.then((data) => setPatterns(data))
			.catch((error) => alert(error));
	}, []);

	if (authState.role !== "admin") {
		return <Navigate to="/" />;
	}
	return (
		<div className="w-75 d-flex flex-column mx-auto mt-5">
			{patterns.map((pattern) => (
				<div>
					<div className="border rounded w-100 bg-soft m-2 border-pink">
						<PatternCard pattern={pattern} />
						<button
							id={pattern.id}
							onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
								handleDelete((e.target as HTMLButtonElement).id)
							}
							className="btn btn-primary m-3"
						>
							Delete
						</button>
						<Link
							className="btn btn-primary m-3"
							to={`/patterns/${pattern.id}/update`}
						>
							Edit
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default AdminPanel;
