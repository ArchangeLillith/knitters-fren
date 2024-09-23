import React, { useContext, useEffect, useState } from "react";
import {
	Log,
	PatternComment,
	AdminPageState as PageState,
} from "../utils/types";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/AuthComponents/AuthProvider";
import { sortByDate } from "../utils/patterns.utils";
import logService from "../services/logs";
import authorService from "../services/author";
import patternService from "../services/pattern";
import commentService from "../services/comments";
import patternTagsService from "../services/pattern-tags";
import Container from "../components/Container";
import {
	Authors,
	Logs,
	DbStats,
	Patterns,
	Tags,
	Comments,
} from "../components/AdminPanelComponents";

const AdminPanel = () => {
	const { authState } = useContext(AuthContext);
	if (authState.role !== "admin") {
		return <Navigate to="/" />;
	}

	const [state, setState] = useState<PageState>({
		patterns: [],
		tags: [],
		logs: [],
		filteredLogs: [],
		authors: [],
		comments: [],
		filteredComments: [],
		showModal: false,
	});

	useEffect(() => {
		logService
			.getAllLogs()
			.then((data) => {
				const filteredLogs: Log[] = sortByDate(data) as Log[];
				setState((prev) => ({
					...prev,
					logs: data,
					filteredLogs: filteredLogs.slice(0, 15),
				}));
			})
			.catch((error) => console.error("Failed to load activity logs:", error));
		patternService
			.getAllPatterns()
			.then((data) => setState((prev) => ({ ...prev, patterns: data })))
			.catch((error) => alert(error));
		patternTagsService
			.getAllTags()
			.then((data) => setState((prev) => ({ ...prev, tags: data })))
			.catch((error) => console.error(error));
		authorService
			.getAllAuthors()
			.then((data) => setState((prev) => ({ ...prev, authors: data })))
			.catch((error) => console.error(error));
		commentService.getAllComments().then((data) => {
			const filteredComments: PatternComment[] = sortByDate(
				data
			) as PatternComment[];
			setState((prev) => ({
				...prev,
				comments: data,
				filteredComments: filteredComments.slice(0, 15),
			}));
		});
	}, []);

	return (
		<Container>
			<div className="accordion my-5">
				<div className="accordion-item">
					<Logs adminState={state} />
				</div>
				<div className="accordion-item">
					<Patterns adminState={state} setAdminState={setState} />
				</div>
				<div className="accordion-item">
					<Tags adminState={state} />
				</div>
				<div className="accordion-item">
					<Authors adminPageState={state} setAdminPageState={setState} />
				</div>
				<div className="accordion-item">
					<DbStats adminState={state} />
				</div>
				<div className="accordion-item">
					<Comments adminState={state} />
				</div>
			</div>
		</Container>
	);
};

export default AdminPanel;
