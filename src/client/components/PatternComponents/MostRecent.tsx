import React from 'react';
import { Link } from 'react-router-dom';

import { Pattern, Tag } from '../../utils/types';
import AssociatedTagList from '../AssociatedTagList';

interface PatternCardProps {
	pattern: Pattern;
	tags: Tag[];
}

const MostRecentRow: React.FC<PatternCardProps> = ({ pattern, tags }) => {
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
			{tags && <AssociatedTagList tags={tags} />}
			<hr />
		</div>
	);
};

export default MostRecentRow;
