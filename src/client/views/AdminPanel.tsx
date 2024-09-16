import React, { useContext, useEffect, useState } from "react";
import { Author, Pattern, Tag, Log } from "../utils/types";
import patternService from "../services/pattern";
import logService from "../services/logs";
import authorService from "../services/author";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

import Container from "../components/Container";
import patternTags from "../services/pattern-tags";
import { sortByDate } from "../utils/patterns.utils";
import {
	AdminAuthors,
	AdminLogs,
	AdminDbStats,
	AdminPatterns,
	AdminTags,
} from "../components/adminPanels";

type AdminState = {
	patterns: Pattern[];
	tags: Tag[];
	logs: Log[];
	filteredLogs: Log[];
	authors: Author[];
	showModal: boolean;
	banAuthor: { id: string; username: string };
};
const AdminPanel = () => {
	const { authState } = useContext(AuthContext);
	if (authState.role !== "admin") {
		return <Navigate to="/" />;
	}

	const [adminState, setAdminState] = useState<AdminState>({
		patterns: [],
		tags: [],
		logs: [],
		filteredLogs: [],
		authors: [],
		showModal: false,
		banAuthor: { id: "", username: "" },
	});

	useEffect(() => {
		logService
			.getAllLogs()
			.then((data) => {
				const filteredLogs: Log[] = sortByDate(data) as Log[];
				setAdminState((prev) => ({
					...prev,
					logs: data,
					filteredLogs: filteredLogs.slice(0, 15),
				}));
			})
			.catch((error) => console.error("Failed to load activity logs:", error));
		patternService
			.getAllPatterns()
			.then((data) => setAdminState((prev) => ({ ...prev, patterns: data })))
			.catch((error) => alert(error));
		patternTags
			.getAllTags()
			.then((data) => setAdminState((prev) => ({ ...prev, tags: data })))
			.catch((error) => console.error(error));
		authorService
			.getAllAuthors()
			.then((data) => setAdminState((prev) => ({ ...prev, authors: data })))
			.catch((error) => console.error(error));
	}, []);

	{
		/* Please to make, delete and edit tags (pref in batch) */
	}
	{
		/* Place to display logging nicely*/
	}
	{
		/* Overview of my database, like how many users and patterns ect, cool stats */
	}

	return (
		<Container>
			<div className="accordion my-5">
				<div className="accordion-item">
					<AdminLogs adminState={adminState} />
				</div>
				<div className="accordion-item">
					<AdminPatterns
						adminState={adminState}
						setAdminState={setAdminState}
					/>
				</div>
				<div className="accordion-item">
					<AdminTags adminState={adminState} />
				</div>
				<div className="accordion-item">
					<AdminAuthors adminState={adminState} setAdminState={setAdminState} />
				</div>
				<div className="accordion-item">
					<AdminDbStats adminState={adminState} />
				</div>
			</div>
		</Container>
	);
};

export default AdminPanel;
