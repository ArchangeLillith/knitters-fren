import React from "react";

const PatternPaid = ({ state, setState }) => {

	/**
	 * Toggle state as a string instead of boolean as that's the pattern for everything based on how communicating with our SQL goes
	 */
	const togglePaid = () => {
		if (state.paid === "true") {
			setState((prev) => ({ ...prev, paid: "false" }));
		} else {
			setState((prev) => ({ ...prev, paid: "true" }));
		}
	};

	return (
		<div className="d-flex align-items-center flex-column justify-content-center">
			<div>
				<label htmlFor="paid-input" className="me-2">
					Paid
				</label>
				<span className="tooltip-icon">?</span>
				<div className="tooltip-text">
					Check if you purchased the pattern. You will be the only one able to
					see and comment on it.
				</div>
			</div>
			<input
				type="checkbox"
				id="paid-input"
				onChange={togglePaid}
				checked={state.paid === "true"}
			/>
		</div>
	);
};

export default PatternPaid;
