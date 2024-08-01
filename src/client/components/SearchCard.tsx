import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IPattern, Tag, Tags } from "../utils/types";
import dayjs from "dayjs";
import patternTags from "../services/pattern-tags";

interface PatternCardProps {
	pattern: IPattern;
	featured?: boolean;
}

const PatternCard = ({ pattern, featured = false }: PatternCardProps) => {
	const [tags, setTags] = React.useState<Tags>();

	useEffect(() => {
		patternTags
			.allByPatternId(parseInt(pattern.id))
			.then((tagsReturned) => setTags(tagsReturned));
	}, []);

	return (
		<div className="my-2 mx-4">
			<div className="m-2">
				{featured && (
					// Changing the text color here to white for the featured section
					<Link
						className="text-color-white text-decoration-none"
						style={{ fontSize: "30px" }}
						to={`/patterns/${pattern.id}`}
					>
						{pattern.title}
					</Link>
				)}
				{!featured && (
					//Changing the text to the primary color which is default
					<Link
						className="font-color-primary text-decoration-none"
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
							<div
								className="btn btn-primary m-2"
								key={`${tag.name}-inner-div-${pattern.author_id}-${pattern.id}`}
							>
								{tag.name}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default PatternCard;
