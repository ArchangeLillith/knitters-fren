import React, { useEffect } from "react";
import { IPattern } from "../utils/types";
import patternService from "../services/pattern";
import PatternCard from "../components/PatternCard";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

interface AdminPanelProps {}

const AdminPanel = (props: AdminPanelProps) => {
	const navigate = useNavigate();
	const [patterns, setPatterns] = React.useState<IPattern[]>([]);

	const handleDelete = (id: string) => {
		patternService
			.destroyPattern(id)
			.then(() => navigate("/patterns/admin"))
			.catch((e) => Toast.failure(e.message));
	};

	useEffect(() => {
		patternService.getAllPatterns().then((data) => setPatterns(data))
		.catch((e) => Toast.failure(e.message));
	}, []);
	return (
		<div className="w-75 d-flex flex-column mx-auto mt-5">
			{patterns.map((pattern) => (
				<div>
					<div className="border rounded w-100 bg-soft m-2 border-primary">
						<PatternCard pattern={pattern} />
						<button
							id={pattern.id}
							onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
								handleDelete(e.target.id)
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
