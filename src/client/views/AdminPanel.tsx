import React, { useContext, useEffect, useState } from "react";
import { IPattern, Log } from "../utils/types";
import patternService from "../services/pattern";
import logService from "../services/logs";
import PatternCard from "../components/PatternCard";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

const AdminPanel = () => {
	const { authState } = useContext(AuthContext);
	const navigate = useNavigate();
	const [patterns, setPatterns] = useState<IPattern[]>([]);
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
	}, []);

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
			<div className="activity-log">
				<h2>Activity Log</h2>
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
								<td>{log.created_at}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{patterns.map((pattern) => (
				<div key={pattern.id}>
					{/* Place to delete a bunch of patterns */}
					{/* Please to make, delete and edit tags (pref in batch) */}
					{/* Place to delete users */}
					{/* Place to display logging */}
					{/* Ban user place */}
					{/* Overview of my database, like how many users and patterns ect, cool stats */}

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
