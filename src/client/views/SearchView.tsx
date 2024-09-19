import React, { useEffect, useState } from "react";
import { Pattern, Tag } from "../utils/types";
import searchService from "../services/search";
import { useLocation } from "react-router-dom";
import TagContainer from "../components/TagContainer";
import SearchPanel from "../components/SearchViewComponents/SearchPanel";
import { SearchPageState as PageState } from "../utils/types";
import NoPatternsFound from "../components/SearchViewComponents/NoPatternsFoud";
import SearchResults from "../components/SearchViewComponents/SearchResults";

function SearchView() {
	const { state } = useLocation();
	const externallySelectedTag: { id: string; name: string } = state;

	const [pageState, setPageState] = useState<PageState>({
		tagsActive: false,
		selectedTags: [],
		searchType: "tag",
		queryString: "",
		suggestions: [],
		strictComparison: false,
		searchTriggered: false,
		foundPatterns: []
	});

	type ResultType = {
		message: string;
		patternObjects: {
			pattern: Pattern;
			tags: Tag[];
		}[];
	};
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
		setPageState((prev) => ({
			...prev,
			tagsActive: true,
			selectedTags: [
				{
					id: parseInt(externallySelectedTag.id, 10),
					name: externallySelectedTag.name,
				},
			],
		}));
	};

	/** 🌈⭐ The debouncer ⭐🌈
	 * Delays the call to fetch until the user is done typing for the delay set in the inner setTimeout.
	 */
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (pageState.queryString === "") return;

			//Declaring what service we're going to call here based on what's chosen as search type
			const searchFunctions: { [key: string]: Function } = {
				tag: () => {},
				author: searchService.findByAuthor,
				content: searchService.findByContent,
				title: searchService.findByTitle,
			};

			//Getting ahold of that service function here
			const searchFunction = searchFunctions[pageState.searchType];

			//Pull out repeated logic to a scoped util
			const noPatternsFound = () => {
				console.log(`scoped util triggered`);
				setPageState((prev) => ({
					...prev,
					foundPatterns: [],
					searchTriggered: true,
				}));
			};

			if (searchFunction) {
				//Triggering the service search function here based on type
				searchFunction(pageState.queryString)
					.then((result: ResultType) => {
						console.log(`patterns in tsx`, result);
						if (result.message === "patterns found") {
							setPageState((prev) => ({
								...prev,
								foundPatterns: result.patternObjects,
								searchTriggered: true,
							}));
						} else {
							console.log(`no patterns found, triggering scoped util`);
							noPatternsFound();
						}
					})
					.catch(() => {
						console.log(`CATCH`);
						noPatternsFound();
					});
			}
		}, 1000);
		return () => clearTimeout(timeoutId);
	}, [pageState.queryString, pageState.searchType]);

	/**
	 *
	 * @param searchTypeDropdown - select dropdown that's value is what the user wants to search by
	 * Sets the search type between the offered options, foundPatterns is reset on change of search type and the type of serach value is passed in on change of the select element which sets a state and has an effect on the search trigger function as well as UI elements
	 */
	const updateSearchType = (
		searchTypeDropdown: React.ChangeEvent<HTMLSelectElement>
	) => {
		setPageState((prev) => ({
			...prev,
			foundPatterns: [],
			searchTriggered: false,
			queryString: "",
			searchType: searchTypeDropdown.target.value,
		}));
	};

	/**
	 * Handles the search by tags when the submit button is clicked
	 */
	const searchTrigger = () => {
		setPageState((prev) => ({
			...prev,
			foundPatterns: [],
			searchTriggered: true,
		}));

		const searchFunction = pageState.strictComparison
			? searchService.findByTagsStrict
			: searchService.findByTags;

		searchFunction(pageState.selectedTags)
			.then((data) =>
				setPageState((prev) => ({ ...prev, foundPatterns: data }))
			)
			.catch(() =>
				setPageState((prev) => ({
					...prev,
					foundPatterns: [],
				}))
			);
	};

	/**
	 * Controls the toggle for the strict mode button
	 */
	const handleStrictMode = () =>
		setPageState((prev) => ({
			...prev,
			strictComparison: !pageState.strictComparison,
		}));

	/**
	 * Handles the reset button, clears out the chosen tags array and sets the tags to inactive as that state handles the buttons that should only be avaliable if there are tags chosen
	 */
	const clearSelection = () => {
		setPageState((prev) => ({ ...prev, selectedTags: [], tagsActive: false }));
	};

	/**
	 * Takes the found patterns from any search and formats the results into React friendly card components or a no patterns found message
	 * @returns an array of PatternCards, a React component, or a message saying there are no patterns with those params
	 */
	const resultsHtml = pageState.searchTriggered ? (
		pageState.foundPatterns.length > 0 ? (
			<SearchResults foundPatterns={pageState.foundPatterns} />
		) : (
			<NoPatternsFound />
		)
	) : null;

	return (
		<div>
			<div className="p-4 m-3 d-flex">
				<h3 className="text-soft">You are searching by:</h3>
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
			{pageState.searchType === "tag" ? (
				<>
					<h2 className="text-center mt-5 text-primary">
						Select tags to search by!
					</h2>
					<div>{JSON.stringify(pageState.selectedTags)}</div>
					<div className="w-75 mx-auto mt-5">
						<TagContainer
							selectedTags={pageState.selectedTags}
							setSelectedTags={setPageState}
						/>
					</div>
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
								pageState.tagsActive ? "visible" : "invisible"
							}  btn btn-soft small p-2 m-2 text-muted border border-pink btn btn-outline-primary mx-auto`}
							htmlFor="strictModeBtn"
						>
							Strict comparison
						</label>

						<button
							className={`${
								pageState.tagsActive ? "visible" : "invisible"
							}  btn btn-soft small p-2 m-2 text-muted border border-pink btn btn-primary mx-auto`}
							onClick={searchTrigger}
						>
							Search!
						</button>
						<button
							onClick={clearSelection}
							className={`${
								pageState.tagsActive ? "visible" : "invisible"
							}  btn btn-soft small p-2 m-2 text-muted border border-pink btn btn-primary mx-auto`}
						>
							Clear Tags
						</button>
					</div>
				</>
			) : (
				<SearchPanel state={pageState} setState={setPageState} />
			)}
			<div className="w-75 d-flex flex-column mx-auto mt-5">{resultsHtml}</div>
		</div>
	);
}

export default SearchView;
