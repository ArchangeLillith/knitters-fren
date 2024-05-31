import React from "react";
import { Link } from "react-router-dom";
import { IPattern } from "../utils/types";
import dayjs from "dayjs";

interface PatternCardProps {
	pattern: IPattern;
	tags?: boolean;
}

const PatternCard = ({ pattern, tags = true }: PatternCardProps) => {
	const tagsArray: string[] = ["DPNS", "Circular", "US 7", "Fingering Weight"];
	return (
		<>
			{pattern && (
				<div
					className="my-2 mx-4"
					key={`pattern-card-outer-wrapper-${pattern.id}`}
				>
					<div className="m-2" key={`pattern-card-inner-wrapper-${pattern.id}`}>
						<Link
							className="lead text-decoration-none"
							to={`/patterns/${pattern.id}`}
							key={`pattern-card-h3-${pattern.id}`}
						>
							{pattern.title}
						</Link>
						<p key={`pattern-card-para-${pattern.id}`}>
							{pattern.content.slice(0, 200)}...
						</p>
						<small key={`pattern-card-created-at-${pattern.id}`}>
							{dayjs(pattern.created_at).format("MMMM D, YYYY")}
						</small>
						<br />
						{tags && (
							<div>
								{tagsArray.map((tag) => (
									<div className="btn btn-primary m-2" key={tag}>
										{tag}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default PatternCard;
