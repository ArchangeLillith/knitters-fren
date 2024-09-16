import React, { useEffect, useState } from "react";
import authorService from "../services/author";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Pattern, Tags } from "../utils/types";
import patternService from "../services/pattern";
import patternTags from "../services/pattern-tags";
import TagButton from "../components/TagButton";

interface PatternDetailsProps {}

const PatternDetails = (props: PatternDetailsProps) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [author, setAuthor] = React.useState<string>("");
	const [pattern, setPattern] = React.useState<Pattern>({
		id: "0",
		author_id: "Loading...",
		title: "Loading...",
		content: "Loading...",
		created_at: "Loading...",
	});
	const [tags, setTags] = React.useState<Tags | null>([]);

	//Refactor we should paginate this whole view
	/**
	 * Grabs the pattern that's indicated by the URL param from the database on load only to add them into a state to display all the patterns in the database
	 */
	useEffect(() => {
		//Annoying to have this here, there's no way to access this page without an id in the url, but my linter/typescript doesn't know that so it throws a fit below that id can be undefined, but it can't if you reach this page...
		if (!id) return;
		const fetchPAtternandAuthor = async () => {
			try {
				const pattern: Pattern = await patternService.getOnePattern(id);
				setPattern(pattern);

				const author: string = await authorService.getUsernameById(
					pattern.author_id
				);
				setAuthor(author);

				const tags: Tags = await patternTags.allByPatternId(pattern.id);
				setTags(tags);
			} catch (error) {
				alert(`Error: ${error}`);
			}
		};
		fetchPAtternandAuthor();
	}, []);

	/**
	 * This is a one stop shop for deletion of a pattern. It calls the delete function for the joint table as well, because you can't delete the pattern without first cleaing the joint table anyways
	 */
	const handleDelete = () => {
		if (!id) return;
		patternService
			.destroyPattern(id)
			.then(() => navigate("/patterns"))
			.catch((e) => alert(e));
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
						{pattern.link !== "" && (
							<object
								width="100%"
								height="1000"
								data={pattern.link}
								type="application/pdf"
							>
								{" "}
							</object>
						)}
						<p key={`pattern-card-para-${pattern.id}`}>{pattern.content}</p>
						<small>Author: {author}</small>
						<small
							className="m-2"
							key={`pattern-card-created-at-${pattern.id}`}
						>
							<i>
								Submitted: {dayjs(pattern.created_at).format("MMMM D, YYYY")}
							</i>
						</small>
						<br />
						<div className="d-flex mb-3">
							{tags && (
								<div>
									{tags.map((tag) => (
										<TagButton tag={tag} key={tag.id} />
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
