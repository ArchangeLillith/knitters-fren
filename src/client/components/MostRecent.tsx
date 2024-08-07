import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IPattern, Tag, Tags } from "../utils/types";
import patternTags from "../services/pattern-tags";

interface PatternCardProps {
	pattern: IPattern;
}

const MostRecentRow = ({ pattern }: PatternCardProps) => {
	const [tags, setTags] = React.useState<Tags>();

	useEffect(() => {
		patternTags
			.allByPatternId(parseInt(pattern.id))
			.then((tagsReturned) => console.log(tagsReturned));
		// .catch(() => setAuthState({ authenticated: false, checking: false }));
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
					className="lead w-50"
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
						<div className="btn btn-primary m-2" key={tag.name}>
							{tag.name}
						</div>
					))}
				</div>
			)}
			<hr />
		</div>
	);
};

export default MostRecentRow;
