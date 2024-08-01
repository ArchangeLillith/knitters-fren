import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import patternService from "../services/pattern";
import patternTags from "../services/pattern-tags";
import { Tag, Tags } from "../utils/types";

interface AddPatternProps {}

const AddPattern = (props: AddPatternProps) => {
	const navigate = useNavigate();
	const [title, setTitle] = React.useState<string>("");
	const [content, setContent] = React.useState<string>("");
	const [selectedTags, setSelectedTags] = useState<Tags>([]);
	const [tags, setTags] = useState<Tags>([{ id: 0, name: "Loading..." }]);

	const newPatternDTO: {
		title: string;
		content: string;
		author_id: string;
	} = {
		title,
		content,
		author_id: "1",
	};
	/**
	 * Grabs all the tags on load to display to the user when creating their pattern so they can choose which ones they'd like to add
	 */
	useEffect(() => {
		fetch(process.env.ROOT_URL + "/api/tags")
			.then((res) => res.json())
			.then((data) => setTags(data))
			.catch((e) => console.log("[fetch erorr]", e));
	}, []);

	/**
	 * @param submitButton - The submit button clicked to fire the submission of the pattern
	 * Formats the data of the tags into what the backend expects and throws a request to the server to add the pattern to the patterns table. If this succeeds, then the tags are added associated with the newly created patternId into the pattern_tags table. Then the page nevigates to the pattern that was just created.
	 */
	const handleSubmit = async (
		submitButton: React.MouseEvent<HTMLButtonElement>
	) => {
		submitButton.preventDefault();
		const newArr: number[] = [];
		let patternId: number;
		for (let i = 0; i < selectedTags.length; i++) {
			newArr.push(selectedTags[i].id);
		}
		try {
			const pattern = await patternService.addNewPattern(newPatternDTO);
			patternId = pattern.id;
			if (patternId) {
				patternTags
					.addNewTags({ pattern_id: patternId, tag_ids: newArr })
					.then(() => navigate(`/patterns/${patternId}`));
			}
		} catch (error) {
			//Refactor this should show errors that impact the user, like the title being a dupe
			// .catch(e => Toast.error(e.message));
		}
	};

	/**
	 * @param tagButton - the specific button clicked with all the context such as the value of the tag desired
	 * Takes in the tag and either adds it to the state of checked tags or filters it out if it exists within that array already
	 */
	const tagToggle = (tagButton: React.ChangeEvent<HTMLInputElement>) => {
		const { id, name } = tagButton.target;
		setSelectedTags((prevTags) => {
			const tagIndex = prevTags.findIndex((tag) => tag.name === name);
			if (tagIndex === -1) {
				return [...prevTags, { id: parseInt(id), name }];
			} else {
				return prevTags.filter((tag) => tag.name !== name);
			}
		});
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
						required={true}
						maxLength={100}
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
						required={true}
						maxLength={10000}
						onChange={(e) => setContent(e.target.value)}
						value={content}
						className="form-control-lg form-control flex-grow-1 bg-soft"
						id="pattern-details"
						placeholder="Start writing..."
						name="body"
						rows={10}
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
