import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IPattern, Tag, Tags } from "../utils/types";
import patternTags from "../services/pattern-tags";
import TagButton from "./TagButton";

interface PatternCardProps {
	pattern: IPattern;
}

const MostRecentRow: React.FC<PatternCardProps> = ({ pattern }) => {
	const [tags, setTags] = React.useState<Tags>();

	/**
	 * Fetches all pattern tags to set to state, displaying in the map
	 */
	useEffect(() => {
		patternTags
			.allByPatternId(pattern.id)
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
				<div key="tags-container">
					{tags.map((tag: Tag) => (
						<TagButton tag={tag} key={tag.id} />
					))}
				</div>
			)}
			<hr />
		</div>
	);
};

export default MostRecentRow;
