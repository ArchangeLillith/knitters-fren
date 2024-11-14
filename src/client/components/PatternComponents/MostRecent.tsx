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
				className="d-flex flex-column flex-lg-row justify-content-around"
				key={`${pattern.id}-most-recent`}
			>
				{/* Title: On mobile, this will be stacked above the paragraph */}
				<Link
					to={`/patterns/${pattern.id}`}
					className="w-100 w-lg-50 link-white fs-4 mb-2 mb-lg-0"
				>
					{pattern.title}
				</Link>

				{/* Paragraph: On mobile, this will be below the title */}
				<p className="small w-100 w-lg-75"></p>
			</div>
			<div className="d-none d-lg-block">
				{pattern.tags && <AssociatedTagList tags={pattern.tags} />}
			</div>
			<hr />
		</div>
	);
};

export default MostRecentRow;
