import React from 'react';

import { AddPatternPageProps } from '../../utils/types';

const PatternLink: React.FC<AddPatternPageProps> = ({ state, setState }) => {
	return (
		<div className="flex-grow-1 me-3">
			<label htmlFor="pattern-link">Pattern Link</label>
			<input
				type="text"
				required={true}
				maxLength={100}
				onChange={e => setState(prev => ({ ...prev, link: e.target.value }))}
				value={state.link}
				className="form-control bg-soft w-100"
				id="pattern-link"
				placeholder="Link..."
			/>
		</div>
	);
};

export default PatternLink;
