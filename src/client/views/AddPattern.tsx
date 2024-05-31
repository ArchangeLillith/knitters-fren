import React from "react";
import { useNavigate } from "react-router-dom";

import patternService from "../services/pattern";
import Container from "../components/Container";

interface AddPatternProps {}

const AddPattern = (props: AddPatternProps) => {
	const navigate = useNavigate();
	const [title, setTitle] = React.useState<string>("");
	const [content, setContent] = React.useState<string>("");

	const newPatternDTO: { title: string; content: string; author_id: string } = {
		title,
		content,
		author_id: "1",
	};

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log(`DTO`, newPatternDTO);
		patternService
			.addNewPattern(newPatternDTO)
			.then((pattern) => navigate(`/patterns/${pattern.id}`));
		// .catch(e => Toast.error(e.message));
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
						rows={15}
						name="body"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Start writing..."
						className="form-control-lg form-control flex-grow-1 bg-soft"
						id="pattern-details"
					></textarea>
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
