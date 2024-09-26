import React, { Dispatch, SetStateAction } from 'react';

import { SearchPageState as PageState } from '../../utils/types';

interface StringSearchPanelProps {
	pageState: PageState;
	setPageState: Dispatch<SetStateAction<PageState>>;
}

const StringSearchPanel: React.FC<StringSearchPanelProps> = ({
	pageState,
	setPageState,
}) => {
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
						onChange={e =>
							setPageState(prev => ({
								...prev,
								queryString: e.target.value,
							}))
						}
						value={pageState.queryString}
						placeholder="Start typing!"
					></input>
				</div>
			</form>
		</>
	);
};

export default StringSearchPanel;
