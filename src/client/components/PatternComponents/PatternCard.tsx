import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import LockIcon from './LockIcon';
import { PatternObject } from '../../utils/types';
import AssociatedTagList from '../AssociatedTagList';
import FavIcon from './FavIcon';
import { AuthContext } from '../AuthComponents/AuthProvider';
import DateSnippet from '../DateSnippet';

interface PatternCardProps {
	pattern: PatternObject;
	featured?: boolean;
}

const PatternCard = ({ pattern, featured = false }: PatternCardProps) => {
	const { authState } = useContext(AuthContext);

	const patternContentCleaned =
		pattern.content.length < 200 ? (
			pattern.content
		) : (
			<>{pattern.content.slice(0, 200)}...</>
		);

	return (
		<div className={`${featured ? 'my-lg-2 mx-lg-4 mx-2' : 'my-lg-2 mx-lg-4'}`}>
			<div className="m-2">
				<div className="d-flex flex-row justify-content-between align-items-center">
					<div className="d-flex align-items-center justify-content-start">
						<Link
							className={`${featured ? 'link-white' : 'link-pink'}`}
							to={`/patterns/${pattern.id}`}
						>
							{pattern.title}
						</Link>
						{pattern.paid === 'true' && <LockIcon size={20} />}
					</div>
					{authState.authenticated && !featured && (
						<FavIcon patternId={pattern.id} size={20} />
					)}
				</div>
				<p key={`pattern-card-para-${pattern.id}`}>{patternContentCleaned}</p>
				<div className="d-flex flex-row justify-space-around">
					<small className="pattern-date">
						<DateSnippet createdAt={pattern.created_at} />
					</small>
					<small className="pattern-author">{pattern.username}</small>
				</div>
				<br className="d-none d-lg-block" />
				{!featured && pattern.tags?.length > 0 && (
					<AssociatedTagList tags={pattern.tags} />
				)}
			</div>
		</div>
	);
};

export default PatternCard;
