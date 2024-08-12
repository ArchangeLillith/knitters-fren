import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IPattern, Tags, Tag } from "../utils/types";
import patternService from "../services/pattern";
import patternTags from "../services/pattern-tags";
import Toast from "../components/Toast";

interface PatternDetailsProps {}

const PatternDetails = (props: PatternDetailsProps) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [pattern, setPattern] = React.useState<IPattern>({
		id: "0",
		author_id: "Loading...",
		title: "Loading...",
		content: "Loading...",
		created_at: "Loading...",
	});
	const [tags, setTags] = React.useState<Tags>([]);

	useEffect(() => {
		//This error here is my linter throwing a fit, it shouldn't be undefined cause you can't get here without a param in your url
		patternService.getOnePattern(id).then((data) => setPattern(data));
		patternTags
			.allByPatternId(parseInt(id))
			.then((tagsReturned) => setTags(tagsReturned))
			.catch((e) => Toast.failure(e.message));
	}, []);

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		//This is a one stop shop for deletion of a pattern. It calls the delete function for the joint table as well, because you can't delete the pattern without first cleaing the joint table anyways
		patternService
			.destroyPattern(id)
			.then(() => navigate("/patterns"))
			.catch((e) => Toast.failure(e.message));
	};

	return (
		<div className="container container-fliud mx-auto w-80 my-3 px-5 py-3 rounded bg-soft">
			{pattern && (
				<div
					className="my-2 mx-4"
					key={`pattern-card-outer-wrapper-${pattern.id}`}
				>
					<div className="m-2" key={`pattern-card-inner-${pattern.id}`}>
						<div
							className="display-4 my-3"
							key={`pattern-card-h3-${pattern.id}`}
						>
							{pattern.title}
						</div>
						<p key={`pattern-card-para-${pattern.id}`}>{pattern.content}</p>
						<small key={`pattern-card-created-at-${pattern.id}`}>
							{dayjs(pattern.created_at).format("MMMM D, YYYY")}
						</small>
						<br />
						<div className="d-flex mb-3">
							{tags && (
								<div>
									{tags.map((tag) => (
										<div
											className="btn btn-primary m-2"
											key={`tag-${tag.name}-${pattern.author_id}-${pattern.title}`}
										>
											{tag.name}
										</div>
									))}
								</div>
							)}

							<div className="ms-auto">
								<button
									onClick={handleDelete}
									className="btn btn-outline-primary btn-border mx-3 p-2"
								>
									Delete
								</button>
								<Link
									to={`/patterns/${id}/update`}
									className="btn btn-outline-primary btn-border p-2"
								>
									Update~
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PatternDetails;
