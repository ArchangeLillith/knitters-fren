import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Pattern, Tag, Tags } from "../utils/types";
import dayjs from "dayjs";
import patternTags from "../services/pattern-tags";
import TagButton from "./TagButton";

interface PatternCardProps {
	pattern: Pattern;
	featured?: boolean;
}

const PatternCard = ({ pattern }: PatternCardProps) => {
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
		<div className="my-2 mx-4 d-flex">
			<div className="m-2 d-flex flex-column">
				<div>
					<Link
						className="font-color-primary text-decoration-none"
						style={{ fontSize: "25px" }}
						to={`/patterns/${pattern.id}`}
					>
						{pattern.title}
					</Link>
					<p key={`pattern-card-para-${pattern.id}`}>
						{pattern.content.slice(0, 300)}...
					</p>
				</div>
				<div className="h-80">
					<br />
					{tags && (
						<div className="d-flex align-items-end h-auto">
							{tags.map((tag: Tag) => (
								<TagButton tag={tag} />
							))}
							<small className="ms-auto">
								{dayjs(pattern.created_at).format("MMMM D, YYYY")}
							</small>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PatternCard;
