import React from "react";

interface PatternDetailsProps {}

const PatternDetails = ({ state, setState }) => {
	return (
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
	);
};

export default PatternDetails;
