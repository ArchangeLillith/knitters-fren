import React, { useEffect, useState } from "react";
import noteService from "../services/pattern";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import patternService from "../services/pattern";
import { IPattern, Tag, Tags } from "../utils/types";
import patternTags from "../services/pattern-tags";

interface UpdatePatternProps {}

const UpdatePattern = (props: UpdatePatternProps) => {
	const { id } = useParams();
	const { state } = useLocation();
	const navigate = useNavigate();
	const [pattern, setPattern] = useState<IPattern | undefined>();
	const [title, setTitle] = useState<string>();
	const [content, setContent] = useState<string>();
	const [allTags, setAllTags] = useState<Tags>([{ id: 0, name: "Loading..." }]);
	const [selectedTags, setSelectedTags] = useState<Tags>([]);
	const [prevTags, setPrevTags] = useState<Tags>([]);

	//Yeah this errors but I think it's the linter throwing a fit, it does work
	const handleChanges = (
		e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
	) => {
		setPattern((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (state) return;
		if (!id) return;
		//Get the pattern
		patternService.getOnePattern(id).then((pattern: IPattern) => {
			setPattern(pattern);
			setContent(pattern.content);
		});

		//Get all the tags
		fetch(process.env.ROOT_URL + "/api/tags")
			.then((res) => res.json())
			.then((data) => setAllTags(data))
			.catch((e) => console.log("[fetch erorr]", e));

		//Get the tags that are already selected for this pattern
		patternTags
			.allByPatternId(parseInt(id))
			.then((data) => {
				setSelectedTags(data);
			})
			.catch((e) => console.log("[fetch error]", e));
	}, [id, state]);

	const handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		if (!id || !pattern) return;
		const patternDTO: {
			content: string;
			author_id: string;
			id: string;
		} = {
			content: pattern.content,
			author_id: pattern.author_id,
			id,
		};
		console.log(`DTO`, patternDTO);
		noteService.updatePattern(id, patternDTO);

		const pattern_id: number = parseInt(pattern.id);
		const tag_ids: number[] = [];
		for (let tag of selectedTags) {
			tag_ids.push(tag.id);
		}
		patternTags
			.addNewTags({ pattern_id, tag_ids })
			.then(() => navigate(`/patterns/${id}`));
	};

	const tagToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, name } = e.target;
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
		<div className="container bg-soft rounded p-4 my-5">
			<form className="mb-5">
				<div className="display-6">Edit your Pattern:</div>
				<div className="form-group flex-grow-1 d-flex flex-column">
					<textarea
						required={true}
						maxLength={100}
						value={pattern?.title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-100 rounded my-2 py-1 text-large"
						id="pattern-title"
						placeholder="Title..."
					/>
				</div>
				<textarea
					className="w-100 rounded my-4"
					rows={15}
					name="content"
					required={true}
					maxLength={10000}
					value={pattern?.content}
					onChange={handleChanges}
				></textarea>
				<div>
					<label htmlFor="tags">Choose your tags:</label>
					<div
						id="tags-div"
						className="form-control-lg form-control flex-grow-1 bg-soft border-0"
					>
						{allTags.map((tag: Tag) => (
							<div
								className="m-1 d-inline-flex btn-group border-0"
								role="group"
								aria-label="Basic checkbox toggle button group"
								key={`${tag.id}-container`}
							>
								<div className={`tags-container-${tag.name}`}>
									<input
										type="checkbox"
										checked={selectedTags.some(
											(selectedTag) => selectedTag.name === tag.name
										)}
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
							</div>
						))}
					</div>
				</div>
				<button className="btn btn-primary" onClick={handleUpdate}>
					Update the pattern~
				</button>
			</form>
			<img
				src="/images/drawing-nanachi.png"
				style={{
					position: "absolute",
					top: "70%",
					right: "4%",
					width: "250px",
				}}
			></img>
		</div>
	);
};

export default UpdatePattern;
