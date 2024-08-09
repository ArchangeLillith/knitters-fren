import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IPattern, Tags, Tag } from "../utils/types";
import patternService from "../services/pattern";
import patternTags from "../services/pattern-tags";
import TagButton from "../components/TagButton";

interface PatternDetailsProps {}

const PatternDetails = (props: PatternDetailsProps) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [pattern, setPattern] = React.useState<IPattern>();
	const [tags, setTags] = React.useState<Tags>();

	//Refactor we should paginate this whole view
	/**
	 * Grabs the pattern that's indicated by the URL param from the database on load only to add them into a state to display all the patterns in the database
	 */
	useEffect(() => {
		//This error here is my linter throwing a fit, it shouldn't be undefined cause you can't get here without a param in your url
		patternService.getOnePattern(id).then((data) => setPattern(data));
		patternTags
			.allByPatternId(parseInt(id))
			.then((tagsReturned) => setTags(tagsReturned));
		// .catch((e) => Toast.error(e.message));
	}, []);

	/**
	 * This is a one stop shop for deletion of a pattern. It calls the delete function for the joint table as well, because you can't delete the pattern without first cleaing the joint table anyways
	 */
	const handleDelete = () => {
		patternService
			.destroyPattern(id)
			.then(() => navigate("/patterns"))
			.catch();
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
										<TagButton tag={tag} />
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
