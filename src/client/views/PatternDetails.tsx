import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IPattern } from "../utils/types";
import patternService from "../services/pattern";

interface PatternDetailsProps {}

const PatternDetails = (props: PatternDetailsProps) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [pattern, setPattern] = React.useState<IPattern>();
	const tags: string[] = ["DPNS", "Circular", "US 7", "Fingering Weight"];

	useEffect(() => {
		//ZACH how do I get around this typing issue
		patternService.getOnePattern(id).then((data) => setPattern(data));
		// .catch((e) => Toast.error(e.message));
	}, []);

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
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
							{tags.map((tag) => (
								<div
									className="btn btn-primary m-2"
									key={`tag-${tag}-${pattern.author_id}-${pattern.title}`}
								>
									{tag}
								</div>
							))}
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
