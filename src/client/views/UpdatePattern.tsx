import React, { useEffect, useState } from "react";
import noteService from "../services/pattern";
import { useNavigate, useParams } from "react-router-dom";
import patternService from "../services/pattern";
import { IPattern, Tag, Tags } from "../utils/types";
import patternTags from "../services/pattern-tags";

const UpdatePattern = () => {
	const { id } = useParams<string>();
	const navigate = useNavigate();
	const [pattern, setPattern] = useState<IPattern | undefined>(undefined);
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [allTags, setAllTags] = useState<Tags>([{ id: 0, name: "Loading..." }]);
	const [selectedTags, setSelectedTags] = useState<Tags>([]);

	useEffect(() => {
		if (!id) return;
		patternService.getOnePattern(id).then((fetchedPattern: IPattern) => {
			setPattern(fetchedPattern);
			setContent(fetchedPattern.content);
		});

		fetch(`${process.env.ROOT_URL}/api/tags`)
			.then((res) => res.json())
			.then((data) => setAllTags(data))
			.catch((error) => alert(error));

		patternTags
			.allByPatternId(id)
			.then((data) => {
				setSelectedTags(data);
			})
			.catch((error) => alert(error));
	}, [id]);

	const handleChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setPattern((prevPattern) =>
			prevPattern ? { ...prevPattern, [name]: value } : prevPattern
		);
	};

	const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!id || !pattern) return;

		const patternDTO = {
			content: pattern.content,
			author_id: pattern.author_id,
			id,
		};

		noteService.updatePattern(id, patternDTO);

		const tagIds = selectedTags.map((tag) => tag.id);
		patternTags
			.addNewTags({ pattern_id: pattern.id, tag_ids: tagIds })
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
						required
						maxLength={100}
						value={title}
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
					required
					maxLength={10000}
					value={content}
					onChange={handleChanges}
				/>
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
				alt="Nanachi"
			/>
		</div>
	);
};

export default UpdatePattern;
