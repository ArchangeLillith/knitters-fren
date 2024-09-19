import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiLockLine } from "react-icons/ri";
import { Pattern, Tag } from "../../utils/types";
import dayjs from "dayjs";
import patternTags from "../../services/pattern-tags";
import TagButton from "../TagButton";

interface PatternCardProps {
	pattern: Pattern;
	featured?: boolean;
}

const PatternCard = ({ pattern, featured = false }: PatternCardProps) => {
	const [tags, setTags] = React.useState<Tag[]>();

	/**
	 * Fetches all pattern tags to set to state, displaying in the map
	 */
	useEffect(() => {
		// Fetch tags only when not featured
		if (!featured) {
			const fetchTags = async () => {
				try {
					const tagsReturned = await patternTags.getByPatternId(pattern.id);
					setTags(tagsReturned);
				} catch (error) {
					console.error("Error fetching tags:", error);
				}
			};

			fetchTags();
		}
	}, [featured, pattern.id]);

	if (featured) {
		return (
			<div className="my-2 mx-4">
				<div className="m-2">
					<Link
						className="text-color-white text-decoration-none"
						style={{ fontSize: "30px" }}
						to={`/patterns/${pattern.id}`}
					>
						{pattern.title}
					</Link>
					<p key={`pattern-card-para-${pattern.id}`}>
						{pattern.content.slice(0, 200)}...
					</p>
					<div className="d-flex flex-column">
						<small>
							<i>Author: {pattern.username}</i>{" "}
						</small>
						<small>{dayjs(pattern.created_at).format("MMMM D, YYYY")}</small>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="my-2 mx-4">
			<div className="m-2">
				<div className="d-flex align-items-center justify-content-between">
					<Link
						className="font-color-primary link text-decoration-none"
						style={{ fontSize: "25px", color: featured ? "white" : "#e78686" }}
						to={`/patterns/${pattern.id}`}
					>
						{pattern.title}
					</Link>
					{pattern.paid === "true" && (
						<div
							style={{
								display: "inline-block",
								position: "relative",
							}}
						>
							<span className="tooltip-icon-lock">
								<RiLockLine size={15} />
							</span>
							<div className="tooltip-text">
								This pattern is a paid pattern, only you can see this!
							</div>
						</div>
					)}
				</div>
				<p key={`pattern-card-para-${pattern.id}`}>
					{pattern.content.slice(0, 200)}...
				</p>
				<small>{dayjs(pattern.created_at).format("MMMM D, YYYY")}</small>

				<br />
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
			</div>
		</div>
	);
};

export default PatternCard;
