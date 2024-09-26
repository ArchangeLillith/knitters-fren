import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Pattern, Tag } from '../../utils/types';
import TagButton from '../TagButton';
import LockIcon from './LockIcon';
import useFetchData from '../../hooks/useFetchData';

interface PatternCardProps {
	pattern: Pattern;
	featured?: boolean;
}

const PatternCard = ({ pattern, featured = false }: PatternCardProps) => {
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

	if (loading) return <div>Loading...</div>;

	if (error) return <div>Error: {error}</div>;

	if (featured) {
		return (
			<div className="my-2 mx-4">
				<div className="m-2">
					<Link
						className="text-color-white text-decoration-none"
						style={{ fontSize: '30px' }}
						to={`/patterns/${pattern.id}`}
					>
						{pattern.title}
					</Link>
					<p key={`pattern-card-para-${pattern.id}`}>
						{pattern.content.slice(0, 200)}...
					</p>
					<div className="d-flex flex-column">
						<small>
							<i>Author: {pattern.username}</i>{' '}
						</small>
						<small>{dayjs(pattern.created_at).format('MMMM D, YYYY')}</small>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="my-2 mx-4">
			<div className="m-2">
				<div className="d-flex align-items-center justify-content-between">
					<Link
						className={`link font-color-primary ${featured ? 'text-white' : 'text-pink'}`}
						to={`/patterns/${pattern.id}`}
						style={{ fontSize: featured ? '30px' : '25px' }}
					>
						{pattern.title}
					</Link>
					{pattern.paid === 'true' && <LockIcon />}
				</div>
				<p key={`pattern-card-para-${pattern.id}`}>
					{pattern.content.slice(0, 200)}...
				</p>
				<small>{dayjs(pattern.created_at).format('MMMM D, YYYY')}</small>

				<br />
				{!featured && data.tags?.length > 0 && (
					<div className="tag-buttons-container">
						{data.tags.map(tag => (
							<TagButton key={tag.id} tag={tag} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default PatternCard;
