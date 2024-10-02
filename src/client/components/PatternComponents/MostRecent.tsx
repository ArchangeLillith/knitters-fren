import React from 'react';
import { Link } from 'react-router-dom';

import { Pattern } from '../../utils/types';
import AssociatedTagList from '../AssociatedTagList';

interface PatternCardProps {
	pattern: Pattern;
}

const MostRecentRow: React.FC<PatternCardProps> = ({ pattern }) => {
	return (
		<div key={`${pattern.id}-wrapper-most-recent`}>
			<div
				className="d-flex flex-row justify-content-around"
				key={`${pattern.id}-most-recent`}
			>
				<Link to={`/patterns/${pattern.id}`} className="w-50 link-white fs-4">
					{pattern.title}
				</Link>
				<p className="small w-75">{pattern.content.slice(0, 150)}...</p>
			</div>
			{pattern.tags && <AssociatedTagList tags={pattern.tags} />}
			<hr />
		</div>
	);
};

export default MostRecentRow;
