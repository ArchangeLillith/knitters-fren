import React, { useEffect, useState } from "react";
import noteService from "../services/pattern";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "../utils/use-form";
import patternService from "../services/pattern";
import { IPattern } from "../utils/types";

interface UpdatePatternProps {}

const UpdatePattern = (props: UpdatePatternProps) => {
	const [pattern, setPattern] = useState<IPattern | undefined>();
	const [content, setContent] = useState<string>();
	const [title, setTitle] = useState<string>();
	const { id } = useParams();
	const { state } = useLocation();
	const navigate = useNavigate();

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
		patternService.getOnePattern(id).then((pattern: IPattern) => {
			setPattern(pattern);
			setContent(pattern.content);
		});
		// .catch(e => Toast.error(e.message));
	}, [id]);

	const handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		if (!id || !pattern) return;
		const patternDTO: { content: string; author_id: string; id: string } = {
			content: pattern.content,
			author_id: pattern.author_id,
			id,
		};
		noteService
			.updatePattern(id, patternDTO)
			.then(() => navigate(`/patterns/${id}`));
		// .catch(e => Toast.error(e.message));
	};

	return (
		<div className="container bg-soft rounded p-4 my-5">
			<div className="display-6">Edit your Pattern:</div>
			<textarea
				className="w-100 rounded my-4"
				rows={15}
				name="content"
				value={pattern?.content}
				onChange={handleChanges}
			></textarea>
			<button className="btn btn-primary" onClick={handleUpdate}>
				Update the pattern~
			</button>
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
