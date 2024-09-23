import React, { Dispatch, SetStateAction } from 'react';

import { SearchPageState as PageState } from '../../utils/types';

interface SearchPanelProps {
	state: PageState;
	setState: Dispatch<SetStateAction<PageState>>;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ state, setState }) => {
	return (
		<>
			<form>
				<div className="d-flex flex-column justify-content-center align-items-center form-group">
					<h1 className="text-center mt-5 text-primary">
						What do you want to find?
					</h1>
					<input
						className="w-25 form-control"
						//We need to prevent default here too
						onChange={(e) =>
							setState((prev) => ({
								...prev,
								queryString: e.target.value,
							}))
						}
						value={state.queryString}
						placeholder="Start typing!"
					></input>
				</div>
			</form>
		</>
	);
};

export default SearchPanel;
