import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import {
	Authors,
	Logs,
	DbStats,
	Patterns,
	Tags,
	Comments,
} from '../components/AdminPanelComponents';
import { AuthContext } from '../components/AuthComponents/AuthProvider';
import Container from '../components/Container';
import authorService from '../services/author';
import commentService from '../services/comments';
import logService from '../services/logs';
import patternService from '../services/pattern';
import patternTagsService from '../services/pattern-tags';
import { sortByDate } from '../utils/patterns.utils';
import {
	Log,
	PatternComment,
	AdminPageState as PageState,
} from '../utils/types';

const AdminPanel = () => {
	const { authState } = useContext(AuthContext);

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
		const fetchData = async () => {
			try {
				const [logs, patterns, tags, authors, comments] = await Promise.all([
					logService.getAllLogs(),
					patternService.getAllPatterns(),
					patternTagsService.getAllTags(),
					authorService.getAllAuthors(),
					commentService.getAllComments(),
				]);

				const filteredLogs: Log[] = sortByDate(logs) as Log[];
				const filteredComments: PatternComment[] = sortByDate(
					comments
				) as PatternComment[];

				setState(prev => ({
					...prev,
					logs,
					filteredLogs: filteredLogs.slice(0, 15),
					patterns,
					tags,
					authors,
					comments,
					filteredComments: filteredComments.slice(0, 15),
				}));
			} catch (error) {
				console.error('Failed to load data:', error);
			}
		};
		fetchData();
	}, []);

	if (authState.role !== 'admin') {
		return <Navigate to="/" />;
	}
	return (
		<Container>
			<div className="accordion my-5">
				<div className="accordion-item">
					<Logs state={state} />
				</div>
				<div className="accordion-item">
					<Patterns state={state} setState={setState} />
				</div>
				<div className="accordion-item">
					<Tags state={state} />
				</div>
				<div className="accordion-item">
					<Authors state={state} setState={setState} />
				</div>
				<div className="accordion-item">
					<DbStats state={state} />
				</div>
				<div className="accordion-item">
					<Comments state={state} />
				</div>
			</div>
		</Container>
	);
};

export default AdminPanel;
