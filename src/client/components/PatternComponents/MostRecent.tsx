import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import patternTags from '../../services/pattern-tags';
import { Pattern, Tag } from '../../utils/types';
import TagButton from '../TagButton';

interface PatternCardProps {
	pattern: Pattern;
}

const MostRecentRow: React.FC<PatternCardProps> = ({ pattern }) => {
	const [tags, setTags] = React.useState<Tag[]>();

	/**
	 * Fetches all pattern tags to set to state, displaying in the map
	 */
	useEffect(() => {
 const fetchPatterns = async () => {
	 const fetchedPatterns = await patternTags.getByPatternId(pattern.id);
	 set 

 }
		patternTags
			.getByPatternId(pattern.id)
			.then((tagsReturned) => setTags(tagsReturned));
	}, [pattern.id]);

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
