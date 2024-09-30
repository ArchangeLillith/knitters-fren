import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

import LockIcon from './LockIcon';
import { PatternObject } from '../../utils/types';
import AssociatedTagList from '../AssociatedTagList';

interface PatternCardProps {
	patternObject: PatternObject;
	featured?: boolean;
}

const PatternCard = ({ patternObject, featured = false }: PatternCardProps) => {
	if (featured) {
		return (
			<div className="my-2 mx-4">
				<div className="m-2">
					<Link
						className="text-color-white text-decoration-none"
						style={{ fontSize: '30px' }}
						to={`/patterns/${patternObject.pattern.id}`}
					>
						{patternObject.pattern.title}
					</Link>
					<p key={`pattern-card-para-${patternObject.pattern.id}`}>
						{patternObject.pattern.content.slice(0, 200)}...
					</p>
					<div className="d-flex flex-column">
						<small>
							<i>Author: {patternObject.pattern.username}</i>{' '}
						</small>
						<small>
							{dayjs(patternObject.pattern.created_at).format('MMMM D, YYYY')}
						</small>
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
						to={`/patterns/${patternObject.pattern.id}`}
						style={{ fontSize: featured ? '30px' : '25px' }}
					>
						{patternObject.pattern.title}
					</Link>
					{patternObject.pattern.paid === 'true' && <LockIcon />}
				</div>
				<p key={`pattern-card-para-${patternObject.pattern.id}`}>
					{patternObject.pattern.content.slice(0, 200)}...
				</p>
				<small>
					{dayjs(patternObject.pattern.created_at).format('MMMM D, YYYY')}
				</small>

				<br />
				{!featured && patternObject.tags?.length > 0 && (
					<AssociatedTagList tags={patternObject.tags} />
				)}
			</div>
		</div>
	);
};

export default PatternCard;
