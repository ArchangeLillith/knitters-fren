import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import LockIcon from './LockIcon';
import { PatternObject } from '../../utils/types';
import AssociatedTagList from '../AssociatedTagList';
import FavIcon from './FavIcon';
import { AuthContext } from '../AuthComponents/AuthProvider';

interface PatternCardProps {
	patternObject: PatternObject;
	featured?: boolean;
}

const PatternCard = ({ patternObject, featured = false }: PatternCardProps) => {
	const { authState } = useContext(AuthContext);

	return (
		<div className="my-2 mx-4">
			<div className="m-2">
				<div className="d-flex flex-row justify-content-between align-items-center">
					<div className="d-flex align-items-center justify-content-start">
						<Link
							className={`${featured ? 'link-white' : 'link-pink'}`}
							to={`/patterns/${patternObject.pattern.id}`}
							style={{ fontSize: featured ? '30px' : '25px' }}
						>
							{patternObject.pattern.title}
						</Link>
						{patternObject.pattern.paid === 'true' && <LockIcon size={20} />}
					</div>
					{authState.authenticated && !featured && (
						<FavIcon patternId={patternObject.pattern.id} size={20} />
					)}
				</div>
				<p key={`pattern-card-para-${patternObject.pattern.id}`}>
					{patternObject.pattern.content.slice(0, 200)}...
				</p>
				<small>
					{dayjs(patternObject.pattern.created_at).format('MMMM D, YYYY')}
				</small>
				<small>{patternObject.pattern.username}</small>

				<br />
				{!featured && patternObject.tags?.length > 0 && (
					<AssociatedTagList tags={patternObject.tags} />
				)}
			</div>
		</div>
	);
};

export default PatternCard;
