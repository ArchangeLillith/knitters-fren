import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import patternService from "../services/pattern";
import Container from "../components/Container";
import { Tag, Tags } from "../utils/types";
import patternTags from "../services/pattern-tags";

interface AddPatternProps {}

const AddPattern = (props: AddPatternProps) => {
	const navigate = useNavigate();
	const [title, setTitle] = React.useState<string>("");
	const [content, setContent] = React.useState<string>("");
	const [tags, setTags] = useState<Tags>([{ id: 0, name: "Loading..." }]);
	let chosenTags: { id: number; name?: string }[] = [];

	const newPatternDTO: {
		title: string;
		content: string;
		author_id: string;
	} = {
		title,
		content,
		author_id: "1",
	};

	useEffect(() => {
		fetch("http://localhost:3000/api/tags")
			.then((res) => res.json())
			.then((data) => setTags(data))
			.catch((e) => console.log("[fetch erorr]", e));
	}, []);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const newArr: number[] = [];
		let patternId: number;
		console.log(`DTO`, newPatternDTO);
		for (let i = 0; i < chosenTags.length; i++) {
			newArr.push(chosenTags[i].id);
		}
		try {
			const pattern = await patternService.addNewPattern(newPatternDTO);
			patternId = pattern.id;
			if (patternId) {
				patternTags
					.addNewTag({ pattern_id: patternId, tag_id: newArr })
					.then(() => navigate(`/patterns/${patternId}`));
			}
		} catch (error) {
			// .catch(e => Toast.error(e.message));
		}
	};

	const tagToggle = (e: any) => {
		const tagToToggle = { id: e.target.id, name: e.target.name };
		if (chosenTags.length === 0) {
			chosenTags.push(tagToToggle);
		} else {
			const found = chosenTags.find(
				(chosenTags) => chosenTags.name === tagToToggle.name
			);
			if (found) {
				chosenTags = chosenTags.filter((tag) => tag.name !== tagToToggle.name);
			} else {
				chosenTags.push(tagToToggle);
			}
		}
	};

	return (
		<Container>
			<img
				src="/images/teacup-nanachi.png"
				alt="teacup-nanachi"
				style={{
					zIndex: "-1",
					width: "250px",
					position: "absolute",
					right: "1%",
					top: "12%",
				}}
			/>
			<form className="d-flex flex-column my-4 py-4">
				<div className="form-group flex-grow-1 d-flex flex-column">
					<label htmlFor="pattern-title">Pattern Title</label>
					<input
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						className="form-control bg-soft"
						id="pattern-title"
						placeholder="Title..."
					/>
				</div>
				<div className="form-group flex-grow-1 d-flex flex-column pt-4">
					<label htmlFor="pattern-details">Pattern Details</label>
					<textarea
						rows={10}
						name="body"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Start writing..."
						className="form-control-lg form-control flex-grow-1 bg-soft"
						id="pattern-details"
					></textarea>
				</div>
				<div>
					<label htmlFor="tags">Choose your tags:</label>
					<div
						id="tags-div"
						className="form-control-lg form-control flex-grow-1 bg-soft"
					>
						{tags.map((tag: Tag) => (
							<div
								className="m-1 d-inline-flex btn-group"
								role="group"
								aria-label="Basic checkbox toggle button group"
								key={`${tag.id}-container`}
							>
								<input
									type="checkbox"
									className="btn-check"
									id={`${tag.id}`}
									autoComplete="off"
									onChange={tagToggle}
									name={tag.name}
									key={tag.name}
								/>
								<label
									className="btn btn-outline-primary"
									htmlFor={`${tag.id}`}
								>
									{tag.name}
								</label>
							</div>
						))}
					</div>
				</div>
				<div className="d-flex justify-content-center align-items-center">
					<button
						className="btn btn-primary py-1 w-25 my-3"
						onClick={handleSubmit}
					>
						Add Pattern~
					</button>
				</div>
			</form>
		</Container>
	);
};

export default AddPattern;
