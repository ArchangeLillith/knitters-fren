import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IPattern, Tag, Tags } from "../utils/types";
import dayjs from "dayjs";
import patternTags from "../services/pattern-tags";
import TagButton from "./TagButton";

interface PatternCardProps {
	pattern: IPattern;
	featured?: boolean;
}

const PatternCard = ({ pattern, featured = false }: PatternCardProps) => {
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
		<div className="my-2 mx-4">
			<div className="m-2">
				{featured && (
					// Changing the text color here to white for the featured section
					<Link
						className="text-decoration-none"
						style={{ fontSize: "30px", color: "white" }}
						to={`/patterns/${pattern.id}`}
					>
						{pattern.title}
					</Link>
				)}
				{!featured && (
					//Changing the text to the primary color which is default
					<Link
						className="font-color-primary link text-decoration-none"
						style={{ fontSize: "25px" }}
						to={`/patterns/${pattern.id}`}
					>
						{pattern.title}
					</Link>
				)}
				<p key={`pattern-card-para-${pattern.id}`}>
					{pattern.content.slice(0, 200)}...
				</p>
				<small>{dayjs(pattern.created_at).format("MMMM D, YYYY")}</small>
				<br />
				{tags && (
					<div>
						{tags.map((tag: Tag) => (
							<TagButton tag={tag} key={tag.id} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default PatternCard;
