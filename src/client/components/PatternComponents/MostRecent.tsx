import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import useFetchData from '../../hooks/useFetchData';
import { Pattern, Tag } from '../../utils/types';
import TagButton from '../TagButton';

interface PatternCardProps {
	pattern: Pattern;
}

const MostRecentRow: React.FC<PatternCardProps> = ({ pattern }) => {
	const fetchConfigs = useMemo(
		() => [
			{
				key: 'tags',
				url: `/api/pattern_tags/${pattern.id}`,
			},
		],
		[]
	);

	const { data, loading, error } = useFetchData<{ tags: Tag[] }>(fetchConfigs);
	const { tags } = data;
	if (loading) <p>Loading....</p>;
	if (error) <p>error....</p>;

	return (
		<div key={`${pattern.id}-wrapper-most-recent`}>
			<div
				className="d-flex flex-row justify-content-around"
				key={`${pattern.id}-most-recent`}
			>
				<Link to={`/patterns/${pattern.id}`} className="lead w-50 link">
					{pattern.title}
				</Link>
				<p className="small w-75">{pattern.content.slice(0, 150)}...</p>
			</div>
			{tags && (
				<>
					{tags.map((tag: Tag) => (
						<div
							className="m-1 d-inline-flex btn-group"
							role="group"
							aria-label="Basic checkbox toggle button group"
							key={`${tag.id}-container`}
						>
							<TagButton tag={tag} />
						</div>
					))}
				</>
			)}
			<hr />
		</div>
	);
};

export default MostRecentRow;
