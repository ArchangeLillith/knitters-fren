import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IPattern, Tag, Tags } from "../utils/types";
import patternTags from "../services/pattern-tags";
import TagButton from "./TagButton";

interface PatternCardProps {
	pattern: IPattern;
}

const MostRecentRow = ({ pattern }: PatternCardProps) => {
	const [tags, setTags] = React.useState<Tags>();

	/**
	 * Fetches all pattern tags to set to state, displaying in the map
	 */
	useEffect(() => {
		patternTags
			.allByPatternId(pattern.id)
			.then((tagsReturned) => setTags(tagsReturned));
	}, []);

	return (
		<div key={`${pattern.id}-wrapper-most-recent`}>
			<div
				className="d-flex flex-row justify-content-around"
				key={`${pattern.id}-most-recent`}
			>
				<Link
					to={`/patterns/${pattern.id}`}
					key={`most-recent-${pattern.id}`}
					className="lead w-50 link"
				>
					{pattern.title}
				</Link>
				<p
					className="small w-75"
					key={`most-recent-${pattern.id}-${pattern.created_at}`}
				>
					{pattern.content.slice(0, 150)}...
				</p>
			</div>
			{tags && (
				<div>
					{tags.map((tag: Tag) => (
						<TagButton tag={tag} />
					))}
				</div>
			)}
			<hr />
		</div>
	);
};

export default MostRecentRow;
