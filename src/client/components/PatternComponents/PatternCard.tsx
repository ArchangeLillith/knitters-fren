import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import LockIcon from './LockIcon';
import { PatternObject } from '../../utils/types';
import AssociatedTagList from '../AssociatedTagList';
import FavIcon from './FavIcon';
import { AuthContext } from '../AuthComponents/AuthProvider';

interface PatternCardProps {
	pattern: PatternObject;
	featured?: boolean;
}

const PatternCard = ({ pattern, featured = false }: PatternCardProps) => {
	const { authState } = useContext(AuthContext);

	return (
		<div className="my-2 mx-4">
			<div className="m-2">
				<div className="d-flex flex-row justify-content-between align-items-center">
					<div className="d-flex align-items-center justify-content-start">
						<Link
							className={`${featured ? 'link-white' : 'link-pink'}`}
							to={`/patterns/${pattern.id}`}
							style={{ fontSize: featured ? '30px' : '25px' }}
						>
							{pattern.title}
						</Link>
						{pattern.paid === 'true' && <LockIcon size={20} />}
					</div>
					{authState.authenticated && !featured && (
						<FavIcon patternId={pattern.id} size={20} />
					)}
				</div>
				<p key={`pattern-card-para-${pattern.id}`}>
					{pattern.content.slice(0, 200)}...
				</p>
				<small>{dayjs(pattern.created_at).format('MMMM D, YYYY')}</small>
				<small>{pattern.username}</small>

				<br />
				{!featured && pattern.tags?.length > 0 && (
					<AssociatedTagList tags={pattern.tags} />
				)}
			</div>
		</div>
	);
};

export default PatternCard;
