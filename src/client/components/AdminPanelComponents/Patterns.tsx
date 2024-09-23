import React, { useState } from "react";
import patternService from "../../services/pattern";
import type { ResultSetHeader } from "mysql2";
import { AdminPageState } from "../../utils/types";
import { Link } from "react-router-dom";
import PatternCard from "../PatternComponents/PatternCard";
import Modal from "../Modal";

interface PatternProps {
	adminState: AdminPageState;
	setAdminState: React.Dispatch<React.SetStateAction<AdminPageState>>;
}

const Patterns: React.FC<PatternProps> = ({ adminState, setAdminState }) => {
	const [toBeDeleted, setToBeDelted] = useState<string[]>([]);

	const modalConfirm = (deleteButton: React.MouseEvent<HTMLButtonElement>) => {
		const target = deleteButton.currentTarget as HTMLButtonElement;
		setToBeDelted([target.id]);
		setAdminState((prev) => ({
			...prev,
			showModal: true,
		}));
	};

	const handleDelete = async (
		submitButton: React.MouseEvent<HTMLButtonElement>
	) => {
		submitButton.preventDefault();
		const deletePromises = toBeDeleted.map((id) =>
			patternService.destroyPattern(id)
		);

		try {
			const results: ResultSetHeader[] = await Promise.all(deletePromises);
			const hasErrors = results.some((result) => result.affectedRows === 0);
			if (hasErrors) {
				alert("something went wrong, affectedRows === 0");
			}

			const newPatterns = adminState.patterns.filter(
				(pattern) => !toBeDeleted.includes(pattern.id)
			);

			setAdminState((prev) => ({ ...prev, patterns: newPatterns }));
		} catch (error) {
			console.error(
				"Yo some stuff went wrong during deleting, this is that catch fr that"
			);
			alert(error);
		}
	};

	const addToDelete = (checkBox: React.MouseEvent<HTMLInputElement>) => {
		const id = (checkBox.target as HTMLInputElement).id;

		if (toBeDeleted.some((arrayId) => arrayId === id)) {
			setToBeDelted(toBeDeleted.filter((arrayId) => arrayId !== id));
		} else {
			setToBeDelted((prev) => [...prev, id]);
		}
	};

	const closeModal = () => {
		setAdminState((prev) => ({ ...prev, showModal: false }));
	};

	return (
		<>
			<h2 className="accordion-header">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#panelsStayOpen-collapseTwo"
					aria-expanded="false"
					aria-controls="panelsStayOpen-collapseTwo"
				>
					Patterns
				</button>
			</h2>
			<div
				id="panelsStayOpen-collapseTwo"
				className="accordion-collapse collapse"
			>
				<div className="accordion-body align-items-center justify-content-center d-flex flex-column">
					{toBeDeleted.length > 0 && (
						<button onClick={handleDelete}>Order 66</button>
					)}
					{adminState.patterns?.map((pattern) => (
						<div
							key={`wrapper-for-${pattern.id}`}
							className="border rounded w-100 bg-soft m-2 border-pink"
						>
							<input
								type="checkbox"
								onClick={addToDelete}
								id={`delete-checkbox`}
								className="m-3"
								key={`check-for-${pattern.id}`}
							/>
							<label htmlFor="delete-checkbox">Add to delete list</label>
							<PatternCard
								pattern={pattern}
								key={`patterncard-for-${pattern.id}`}
							/>
							<button
								id={pattern.id}
								onClick={modalConfirm}
								className="btn btn-primary m-3"
								key={`button-for-${pattern.id}`}
							>
								DELEEEETE
							</button>
							<Link
								key={`update-button-for-${pattern.id}`}
								className="btn btn-primary m-3"
								to={`/patterns/${pattern.id}/update`}
							>
								Edit
							</Link>
						</div>
					))}
				</div>

				{adminState.showModal && toBeDeleted.length > 0 && (
					<Modal>
						<div className="align-self-center h3 text-color-light">
							Are you sure you want to ban these patterns?
						</div>
						<div className="d-flex flex-row align-items-center justify-content-center">
							<div className="d-flex flex-column background-light">
								{toBeDeleted}
							</div>
						</div>
						<button
							className="button btn-primary modal-button mb-3"
							onClick={handleDelete}
						>
							Yes, delete that
						</button>
						<button
							className="button btn-primary modal-button"
							onClick={closeModal}
						>
							No, nvm
						</button>
					</Modal>
				)}
			</div>
		</>
	);
};

export default Patterns;
