import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Pattern, AddPatternPageState as PageState } from "../utils/types";
import { AuthContext } from "../components/AuthComponents/AuthProvider";
import Container from "../components/Container";
import AuthWrapper from "../components/AuthComponents/AuthWrapper";
import TagContainer from "../components/TagContainer";
import patternTags from "../services/pattern-tags";
import patternService from "../services/pattern";

const AddPattern = () => {
	const navigate = useNavigate();
	const { authState } = useContext(AuthContext);

	const [state, setState] = useState<PageState>({
		title: "",
		paid: "false",
		content: "",
		link: "",
		selectedTags: [],
	});

	const newPatternDTO: {
		id: string;
		title: string;
		content: string;
		author_id: string;
		link: string;
		paid: "true" | "false";
	} = {
		id: uuidv4(),
		title: state.title,
		content: state.content,
		author_id: authState.id!,
		link: state.link,
		paid: state.paid,
	};

	/**
	 * @param submitButton - The submit button clicked to fire the submission of the pattern
	 * Formats the data of the tags into what the backend expects and throws a request to the server to add the pattern to the patterns table. If this succeeds, then the tags are added associated with the newly created patternId into the pattern_tags table. Then the page nevigates to the pattern that was just created.
	 */
	const handleSubmit = async (
		submitButton: React.MouseEvent<HTMLButtonElement>
	) => {
		submitButton.preventDefault();
		const newArr: number[] = [];
		let patternId: string;
		for (let i = 0; i < state.selectedTags.length; i++) {
			newArr.push(state.selectedTags[i].id);
		}
		try {
			const pattern: Pattern = await patternService.addNewPattern(
				newPatternDTO
			);
			console.log(`Pattern,`, pattern);
			patternId = pattern.id;
			if (newArr) {
				console.log(`Adding tags because there are some:`, newArr);
				patternTags.addNewTags({ pattern_id: patternId, tag_ids: newArr });
			}
			navigate(`/patterns/${patternId}`);
		} catch (error) {
			alert(error);
		}
	};

	const togglePaid = () => {
		if (state.paid === "true") {
			setState((prev) => ({ ...prev, paid: "false" }));
		} else {
			setState((prev) => ({ ...prev, paid: "true" }));
		}
	};

	return (
		<AuthWrapper>
			<Container>
				<img
					src="/images/teacup-nanachi.png"
					alt="teacup-nanachi"
					style={{
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
							onChange={(e) =>
								setState((prev) => ({ ...prev, title: e.target.value }))
							}
							value={state.title}
							className="form-control bg-soft"
							id="pattern-title"
							placeholder="Title..."
						/>
						<div className="d-flex flex-column justify-content-end mt-1 ">
							<div className="d-flex flex-row justify-content-between align-items-center">
								<label htmlFor="pattern-link">Pattern Link</label>
								<div
									style={{
										display: "inline-block",
										position: "relative",
										marginRight: "30px",
									}}
								>
									<label htmlFor="paid-input">Paid</label>
									<span className="tooltip-icon">?</span>
									<div className="tooltip-text">
										Check if you purchased the pattern. You will be the only one
										able to see and comment on it
									</div>
								</div>
							</div>
							<div className="d-flex flex-row justify-content-between">
								<input
									type="text"
									required={true}
									maxLength={100}
									onChange={(e) =>
										setState((prev) => ({ ...prev, link: e.target.value }))
									}
									value={state.link}
									className="form-control bg-soft"
									id="pattern-link"
									placeholder="Link..."
									style={{ width: "90%" }}
								/>
								<input
									type="checkbox"
									style={{ marginRight: "55px" }}
									id="paid-input"
									onChange={togglePaid}
									checked={state.paid === "true"}
								/>
							</div>
						</div>
					</div>
					<div className="form-group flex-grow-1 d-flex flex-column pt-4">
						<label htmlFor="pattern-details">Pattern Details</label>
						<textarea
							required={true}
							maxLength={10000}
							onChange={(e) =>
								setState((prev) => ({ ...prev, content: e.target.value }))
							}
							value={state.content}
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
							<TagContainer
								selectedTags={state.selectedTags}
								setSelectedTags={setState}
							/>
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
		</AuthWrapper>
	);
};

export default AddPattern;
