import React, { useEffect, useState } from "react";
import { IPattern, Tag, Tags, objectType } from "../utils/types";
import search from "../services/search";
import SearchCard from "../components/SearchCard";
import { useLocation } from "react-router-dom";

function SearchView() {
	const { state } = useLocation();
	const externallySelectedTag: { id: string; name: string } = state;
	const [tags, setTags] = useState<Tags>([{ id: 0, name: "Loading..." }]);
	const [chosenTags, setChosenTags] = useState<objectType[]>([]);
	const [searchType, setSearchType] = useState<string>("tag");
	const [queryString, setQueryString] = useState<string>("");
	const [tagsActive, setTagsActive] = useState<boolean>(false);
	const [foundPatterns, setFoundPatterns] = React.useState<IPattern[]>([]);
	const [strictComparison, setStrictComparison] = useState<boolean>(false);

	/**
	 *
	 * @param searchTypeDropdown - select dropdown that's value is what the user wants to search by
	 * Sets the search type between the offered options, foundPatterns is reset on change of search type and the type of serach value is passed in on change of the select element which sets a state and has an effect on the search trigger function as well as UI elements
	 */
	const updateSearchType = (searchTypeDropdown: any) => {
		setFoundPatterns([]);
		setQueryString("");
		setSearchType(searchTypeDropdown.target.value);
	};

	/**
	 *If the usr has clicked on a tag anywhere else, it leads them here to the search and this scrapes the data from the state that came along with the navigate to set the value of the tag clicked on into the active tags (UI) and also adds it to the chosen tags that governs what will be searched for (backend)
	 */
	useEffect(() => {
		if (externallySelectedTag) {
			findAllTags();
			handleExternalTags();
		} else {
			findAllTags();
		}
	}, []);

	const handleExternalTags = () => {
		setTagsActive(true);
		setChosenTags([
			{
				id: externallySelectedTag.id.toString(),
				name: externallySelectedTag.name,
			},
		]);
	};
	/** 🌈⭐ The debouncer ⭐🌈
	 * Delays the call to fetch until the user is done typing for the delay set in the inner setTimeout.
	 */
	useEffect(() => {
		//Set the timeout that calls the fetch
		const getData = setTimeout(() => {
			//Is this going to be a problem later? It's to stop it from triggering immediatley
			if (queryString === "") {
				return;
			}

			switch (searchType) {
				case "tag":
					//Refactor we should maybe debounce the button? Does this make sense from a user standpoitn?
					return;
				//Isn't needed till author refactor
				// case "author":
				// 	search
				// 		.findByTitle(queryString)
				// 		.then((patterns) => setFoundPatterns(patterns));
				// 	break;
				case "content":
					search
						.findByContent(queryString)
						.then((patterns) => setFoundPatterns(patterns));
					break;
				case "title":
					search
						.findByTitle(queryString)
						.then((patterns) => setFoundPatterns(patterns));
					break;
			}
		}, 2000);
		//Cleanup function that runs after a re-render and removes the old setTimeout
		return () => clearTimeout(getData);
		//What the useEffect re-triggers off of a change
	}, [queryString]);

	/**
	 * The real call to the api that gets the tags and sets them to the state to be rendered
	 */
	const findAllTags = () => {
		fetch(process.env.ROOT_URL + "/api/tags")
			.then((res) => res.json())
			.then((data) => setTags(data))
			.catch((e) => console.log("[fetch erorr]", e));
	};

	/**
	 * Currently only handles the search after the submit button is clicked on the tags, looking to perhaps refactor this so the trigger is debounced and acts similar to the text search trigger. Doesn't make sense to have two different triggers imo
	 */
	const searchTrigger = () => {
		setFoundPatterns([]);
		if (strictComparison) {
			search
				.findByTagsStrict(chosenTags)
				.then((res) => setFoundPatterns(res.finalPatterns));
		} else {
			search
				.findByTags(chosenTags)
				.then((res) => setFoundPatterns(res.finalPatterns));
		}
	};

	/**
	 * Controls the toggle for the strict mode button
	 */
	const handleStrictMode = () => {
		setStrictComparison((prev) => !prev);
	};

	/**
	 * Takes the found patterns from any search and formats the results into React friendly card components or a no patterns found message
	 * @returns an array of PatternCards, a React component, or a message saying there are no patterns with those params
	 */
	const resultsHtml = foundPatterns ? (
		foundPatterns.map((pattern, i) => (
			<div
				className="border rounded w-100 bg-soft m-2 border-primary"
				key={`patternCard-${i}`}
			>
				<SearchCard pattern={pattern} />
			</div>
		))
	) : (
		<div className="d-flex flex-column m-auto align-items-center">
			<p className="lead">
				Sorry, Nanachi looked through the archives and no patterns exist within
				those parameters. Please search for something else, she'd be happy to
				assist!
			</p>
			<img
				src="/images/book-nanachi.png"
				alt="book-nanachi"
				style={{
					width: "300px",
				}}
				className=""
			/>
		</div>
	);

	/**
	 * Handles the reset button, clears out the chosen tags array and sets the tags to inactive as that state handles the buttons that should only be avaliable if there are tags chosen
	 */
	const clearSelection = () => {
		setChosenTags([]);
		setTagsActive(false);
	};

	/**
	 * @param tagButton - The tag button that is clicked
	 * Toggles the selected tags as the user clicks them 'on' and 'off', modifying the chosenTags state
	 */
	//Refactor what type is this???
	const tagToggle = (tagButton: any) => {
		const tagToToggle = {
			id: tagButton.target.id,
			name: tagButton.target.name,
		};
		console.log(`Tag button`, tagButton);

		const updatedChosenTags = chosenTags.some(
			(tag) => tag.id === tagToToggle.id
		)
			? chosenTags.filter((tag) => tag.id !== tagToToggle.id)
			: [...chosenTags, tagToToggle];

		console.log(`Updated`, updatedChosenTags);
		setChosenTags(updatedChosenTags);
		setTagsActive(updatedChosenTags.length > 0);
	};

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
						{/* <option value="author">Author</option> */}
						<option value="content">Content</option>
					</select>
				</form>
			</div>
			{searchType === "tag" ? (
				<>
					<h2 className="text-center mt-5 text-primary">
						Select tags to search by!
					</h2>
					<div className="w-75 mx-auto mt-5">
						{tags.map((tag: Tag) => (
							<div
								className="m-1 d-inline-flex btn-group bg-soft"
								role="group"
								aria-label="Basic checkbox toggle button group"
								key={`${tag.id}-container`}
							>
								<input
									type="checkbox"
									className="btn-check"
									id={`${tag.id}`}
									autoComplete="off"
									onChange={tagToggle}
									name={tag.name}
									checked={chosenTags.some(
										(chosenTag) => chosenTag.id === tag.id.toString()
									)}
								/>
								<label
									className="btn btn-outline-primary"
									htmlFor={`${tag.id}`}
								>
									{tag.name}
								</label>
							</div>
						))}
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
								tagsActive ? "visible" : "invisible"
							}  btn btn-soft small p-2 m-2 text-muted border border-primary btn btn-outline-primary mx-auto`}
							htmlFor="strictModeBtn"
						>
							Strict comparison
						</label>

						<button
							className={`${
								tagsActive ? "visible" : "invisible"
							}  btn btn-soft small p-2 m-2 text-muted border border-primary btn btn-primary mx-auto`}
							onClick={searchTrigger}
						>
							Search!
						</button>
						<button
							onClick={clearSelection}
							className={`${
								tagsActive ? "visible" : "invisible"
							}  btn btn-soft small p-2 m-2 text-muted border border-primary btn btn-primary mx-auto`}
						>
							Clear Tags
						</button>
					</div>
					<div className="w-75 d-flex flex-column mx-auto mt-5">
						{resultsHtml}
					</div>
				</>
			) : (
				<>
					<form>
						<div className="d-flex flex-column justify-content-center align-items-center form-group">
							<h1 className="text-center mt-5 text-primary">
								What do you want to find?
							</h1>
							<input
								className="w-25 form-control"
								//We need to prevent default here too
								onChange={(e) => setQueryString(e.target.value)}
								value={queryString}
								placeholder="Start typing!"
							></input>
						</div>
					</form>
					<div className="w-60 d-flex flex-column mx-auto mt-5">
						{resultsHtml}
					</div>
				</>
			)}
		</div>
	);
}

export default SearchView;
