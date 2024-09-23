import React from 'react';

import { AdminPageState } from '../../utils/types';

const DbStats: React.FC<{ state: AdminPageState }> = ({ state }) => {
	return (
		<>
			<h2 className="accordion-header">
				<button
					className="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#panelsStayOpen-collapseFive"
					aria-expanded="false"
					aria-controls="panelsStayOpen-collapseFive"
				>
					Cool Stats
				</button>
			</h2>
			<div
				id="panelsStayOpen-collapseFive"
				className="accordion-collapse collapse"
			>
				<div className="accordion-body">
					<div>Authors:{state.authors?.length}</div>
					<div>Patterns:{state.patterns?.length}</div>
					<div>
						Comments:<i>Work in progress</i>
					</div>
					<div>
						Favorites:<i>Work in progress</i>
					</div>
					<div>
						Author with Most Favorite Patterns:<i>Work in progress</i>
					</div>
					<div>
						Pattern with Most Tags:<i>Work in progress</i>
					</div>
				</div>
			</div>
		</>
	);
};

export default DbStats;
