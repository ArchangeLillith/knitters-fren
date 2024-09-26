import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import useFetchData from '../hooks/useFetchData';
import { sortByDate } from '../utils/patterns.utils';
import {
	Log,
	PatternComment,
	AdminPageState as PageState,
	Tag,
	Pattern,
	Author,
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

	type FetchDataResponse = {
		tags: Tag[];
		patterns: Pattern[];
		logs: Log[];
		authors: Author[];
		comments: PatternComment[];
	};

	const fetchConfigs = useMemo(
		() => [
			{ key: 'patterns', url: '/api/patterns' },
			{ key: 'tags', url: '/api/tags' },
			{ key: 'logs', url: '/api/logs' },
			{ key: 'authors', url: '/api/authors' },
			{ key: 'comments', url: '/api/comments' },
		],
		[]
	);

	const { data, loading, error } =
		useFetchData<FetchDataResponse>(fetchConfigs);

	useEffect(() => {
		if (!data || !data.patterns) return;

		const { tags, patterns, logs, authors, comments } = data;

		const filteredLogs: Log[] = sortByDate(logs) as Log[];
		const filteredComments: PatternComment[] = sortByDate(
			comments
		) as PatternComment[];

		// Update state based on fetched data
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
	}, [data]); // Run effect when data changes

	if (loading) <p>Loadig....</p>;
	if (error) <p>error....</p>;

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
