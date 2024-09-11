import React, { useContext, useEffect, useState } from "react";
import { IPattern, ITag, Log } from "../utils/types";
import patternService from "../services/pattern";
import logService from "../services/logs";
import PatternCard from "../components/PatternCard";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import dayjs from "dayjs";
import Container from "../components/Container";
import patternTags from "../services/pattern-tags";

const AdminPanel = () => {
	const { authState } = useContext(AuthContext);
	const navigate = useNavigate();
	const [patterns, setPatterns] = useState<IPattern[]>([]);
	const [tags, setTags] = useState<ITag[]>([]);
	const [logs, setLogs] = useState<Log[]>([]);

	const handleDelete = (id: string) => {
		//Refactor throw a "do you want to delete this?" here, a modal probs
		patternService
			.destroyPattern(id)
			.then(() => navigate("/patterns/admin"))
			.catch((error) => alert(error));
	};

	useEffect(() => {
		logService
			.getAllLogs()
			.then((data) => setLogs(data))
			.catch((error) => console.error("Failed to load activity logs:", error));
		patternService
			.getAllPatterns()
			.then((data) => setPatterns(data))
			.catch((error) => alert(error));
		patternTags
			.all()
			.then((data) => setTags(data))
			.catch((error) => console.error(error));
	}, []);

	if (authState.role !== "admin") {
		return <Navigate to="/" />;
	}

	{
		/* Place to delete a bunch of patterns */
	}
	{
		/* Please to make, delete and edit tags (pref in batch) */
	}
	{
		/* Place to delete users */
	}
	{
		/* Place to display logging */
	}
	{
		/* Ban user place */
	}
	{
		/* Overview of my database, like how many users and patterns ect, cool stats */
	}

	return (
		<Container>
			<div className="accordion my-5">
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#panelsStayOpen-collapseOne"
							aria-expanded="false"
							aria-controls="panelsStayOpen-collapseOne"
						>
							Activity Log
						</button>
					</h2>
					<div
						id="panelsStayOpen-collapseOne"
						className="accordion-collapse collapse"
					>
						<div className="accordion-body">
							<table>
								<thead>
									<tr>
										<th>Responsible Party</th>
										<th>Action</th>
										<th>Details</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{logs.map((log) => (
										<tr key={log.id}>
											<td>{log.user_id}</td>
											<td>{log.action}</td>
											<td>{log.details}</td>
											<td>{dayjs(log.created_at).format("MMMM D, YYYY")}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#panelsStayOpen-collapseTwo"
							aria-expanded="false"
							aria-controls="panelsStayOpen-collapseTwo"
						>
							Patterns
						</button>
					</h2>
					<div
						id="panelsStayOpen-collapseTwo"
						className="accordion-collapse collapse"
					>
						<div className="accordion-body align-items-center justify-content-center d-flex flex-column">
							{patterns.map((pattern) => (
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
							))}
						</div>
					</div>
				</div>
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#panelsStayOpen-collapseThree"
							aria-expanded="false"
							aria-controls="panelsStayOpen-collapseThree"
						>
							Tags
						</button>
					</h2>
					<div
						id="panelsStayOpen-collapseThree"
						className="accordion-collapse collapse"
					>
						<div className="accordion-body">
							<table>
								<tr>
									<th>Name</th>
									<th>ID</th>
								</tr>
								{tags.map((tag) => (
									<>
										<tr key={tag.id}>
											<td>{tag.name}</td>
											<td>{tag.id}</td>

											<button>Delete</button>
											<button>Update</button>
										</tr>
									</>
								))}
							</table>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default AdminPanel;
