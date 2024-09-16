import React, { Dispatch, SetStateAction, useState } from "react";
import patternService from "../../services/pattern";
import type { ResultSetHeader } from "mysql2";
import { AdminState } from "../../utils/types";
import { Link } from "react-router-dom";
import PatternCard from "../PatternCard";

interface AdminTagsProps {
	adminState: AdminState;
	setAdminState: Dispatch<SetStateAction<AdminState>>;
}

const AdminPatterns: React.FC<AdminTagsProps> = ({
	adminState,
	setAdminState,
}) => {
	const [toBeDeleted, setToBeDelted] = useState<string[]>([]);

	const handleBatchDelete = async (
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
			const updatedPatterns = await patternService.getAllPatterns();
			setAdminState((prev) => ({ ...prev, patterns: updatedPatterns }));
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
		console.log(`toBeDeleted`, toBeDeleted);
	};
	const handleDelete = (id: string) => {
		//Refactor throw a "do you want to delete this?" here, a modal probs
		patternService.destroyPattern(id).catch((error) => alert(error));
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
						<button onClick={handleBatchDelete}>Order 66</button>
					)}
					{adminState.patterns?.map((pattern) => (
						<div
							key={`wrapper-for-${pattern.id}`}
							className="border rounded w-100 bg-soft m-2 border-pink"
						>
							<input
								type="checkbox"
								onClick={addToDelete}
								id={pattern.id}
								key={`check-for-${pattern.id}`}
							/>
							<PatternCard
								pattern={pattern}
								key={`patterncard-for-${pattern.id}`}
							/>
							<button
								id={pattern.id}
								onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
									handleDelete((e.target as HTMLButtonElement).id)
								}
								className="btn btn-primary m-3"
								key={`button-for-${pattern.id}`}
							>
								Delete
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
			</div>
		</>
	);
};

export default AdminPatterns;
