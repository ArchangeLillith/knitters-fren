import React from 'react';

import tagSearchService from '../../services/tagSearch';
import { SearchPageState as PageState, PatternObject } from '../../utils/types';
import AllTagsContainer from '../AllTagsContainer';

interface TagSearchPanelProps {
	pageState: PageState;
	setPageState: React.Dispatch<React.SetStateAction<PageState>>;
}

const TagSearchPanel: React.FC<TagSearchPanelProps> = ({
	pageState,
	setPageState,
}) => {
	/**
	 * Handles the search by tags when the submit button is clicked
	 */
	const searchTrigger = () => {
		setPageState(prev => ({
			...prev,
			foundPatterns: [],
			searchTriggered: true,
		}));

		const searchFunction = pageState.strictComparison
			? tagSearchService.findByTagsStrict
			: tagSearchService.findByTags;

		searchFunction(pageState.selectedTags)
			.then((data: PatternObject[]) =>
				// console.log(`DATA`, data)
				setPageState(prev => ({ ...prev, foundPatterns: data }))
			)
			.catch(() =>
				setPageState(prev => ({
					...prev,
					foundPatterns: [],
				}))
			);
	};

	/**
	 * Controls the toggle for the strict mode button
	 */
	const handleStrictMode = () =>
		setPageState(prev => ({
			...prev,
			strictComparison: !pageState.strictComparison,
		}));

	/**
	 * Handles the reset button, clears out the chosen tags array and sets the tags to inactive as that state handles the buttons that should only be avaliable if there are tags chosen
	 */
	const clearSelection = () => {
		setPageState(prev => ({ ...prev, selectedTags: [], tagsActive: false }));
	};

	return (
		<div className="d-flex flex-column my-2 py-2">
			<h2 className="text-center mt-2 font-color-primary">
				Select tags to search by!
			</h2>
			{/* <div>{JSON.stringify(pageState.selectedTags)}</div> */}
			<AllTagsContainer
				selectedTags={pageState.selectedTags}
				setSelectedTags={setPageState}
			/>
			<div className="d-flex center">
				<input
					type="checkbox"
					className="btn-check"
					autoComplete="off"
					id="strictModeBtn"
					onChange={handleStrictMode}
				/>
				<label
					className={`${
						pageState.tagsActive ? 'visible' : 'invisible'
					}  btn btn-soft small p-2 m-2 text-muted border border-pink btn btn-outline-primary mx-auto`}
					htmlFor="strictModeBtn"
				>
					Strict comparison
				</label>

				<button
					className={`${
						pageState.tagsActive ? 'visible' : 'invisible'
					}  btn btn-soft small p-2 m-2 text-muted border border-pink btn btn-primary mx-auto`}
					onClick={searchTrigger}
				>
					Search!
				</button>
				<button
					onClick={clearSelection}
					className={`${
						pageState.tagsActive ? 'visible' : 'invisible'
					}  btn btn-soft small p-2 m-2 text-muted border border-pink btn btn-primary mx-auto`}
				>
					Clear Tags
				</button>
			</div>
		</div>
	);
};

export default TagSearchPanel;
