import React from 'react';

import { AddPatternPageProps } from '../../utils/types';

const PatternDetails: React.FC<AddPatternPageProps> = ({ state, setState }) => {
	return (
		<div className="form-group flex-grow-1 d-flex flex-column pt-4">
			<label htmlFor="pattern-details">Pattern Details</label>
			<textarea
				required={true}
				maxLength={10000}
				onChange={e => setState(prev => ({ ...prev, content: e.target.value }))}
				value={state.content}
				className="form-control-lg form-control flex-grow-1 bg-soft"
				id="pattern-details"
				placeholder="You can either past a plain text pattern here, or write some notes about the pattern you've linked you'd like to share"
				name="body"
				rows={15}
			></textarea>
		</div>
	);
};

export default PatternDetails;
