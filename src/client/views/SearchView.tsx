import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Container from '../components/Container';
import NoPatternsFound from '../components/SearchViewComponents/NoPatternsFoud';
import SearchResults from '../components/SearchViewComponents/SearchResults';
import StringSearchPanel from '../components/SearchViewComponents/StringSearchPanel';
import TagSearchPanel from '../components/SearchViewComponents/TagSearchPanel';
import { SearchPageState as PageState } from '../utils/types';

function SearchView() {
	console.log(`Search view render`);
	const { state } = useLocation();
	const externallySelectedTag: { id: string; name: string } = state;

	const [pageState, setPageState] = useState<PageState>({
		selectedTags: { selectedTags: [], tagsActive: false },
		searchType: 'tag',
		queryString: '',
		suggestions: [],
		strictComparison: false,
		searchTriggered: false,
		foundPatterns: [],
	});

	/**
	 *If the user has clicked on a tag anywhere else, it leads them here to the search and this scrapes the data from the state that came along with the navigate to set the value of the tag clicked on into the active tags (UI) and also adds it to the chosen tags that governs what will be searched for (backend)
	 */
	useEffect(() => {
		if (externallySelectedTag) {
			handleExternalTags();
		}
	}, []);

	/**
	 * Handles the setting of tags if the user came from an external page. It sets the visual tag to active in the UI, and adds the tag that was selected to the chosen tags array
	 */
	const handleExternalTags = () => {
		setPageState(prev => ({
			...prev,
			selectedTags: {
				selectedTags: [
					{
						id: parseInt(externallySelectedTag.id, 10),
						name: externallySelectedTag.name,
					},
				],
				tagsActive: true,
			},
		}));
	};

	/**
	 *
	 * @param searchTypeDropdown - select dropdown that's value is what the user wants to search by
	 * Sets the search type between the offered options, foundPatterns is reset on change of search type and the type of serach value is passed in on change of the select element which sets a state and has an effect on the search trigger function as well as UI elements
	 */
	const updateSearchType = (
		searchTypeDropdown: React.ChangeEvent<HTMLSelectElement>
	) => {
		setPageState(prev => ({
			...prev,
			foundPatterns: [],
			searchTriggered: false,
			queryString: '',
			searchType: searchTypeDropdown.target.value,
		}));
	};

	/**
	 * Takes the found patterns from any search and formats the results into React friendly card components or a no patterns found message
	 * @returns a component that either displays the found pattern cards or a "no patterns" message
	 */
	const resultsHtml = pageState.searchTriggered ? (
		pageState.foundPatterns.length > 0 ? (
			<SearchResults foundPatterns={pageState.foundPatterns} />
		) : (
			<NoPatternsFound />
		)
	) : null;

	return (
		<Container>
			<div className="p-2 m-3 d-flex align-items-center justify-content-start">
				<h3 className="search-header">You are searching by:</h3>
				<form className="d-flex">
					<select
						className="form-select mx-2 w-auto"
						aria-label="Default select example"
						onChange={updateSearchType}
					>
						<option defaultValue="tag" value="tag">
							Tag
						</option>
						<option value="title">Title</option>
						<option value="author">Author</option>
						<option value="content">Content</option>
					</select>
				</form>
			</div>
			{pageState.searchType === 'tag' ? (
				<TagSearchPanel pageState={pageState} setPageState={setPageState} />
			) : (
				<StringSearchPanel pageState={pageState} setPageState={setPageState} />
			)}
			<div className="w-75 d-flex flex-column mx-auto mt-5">{resultsHtml}</div>
		</Container>
	);
}

export default SearchView;
