import React, { useEffect, useState } from "react";
import PatternCard from "../components/PatternCard";
import { IPattern, Tag, Tags, objectType } from "../utils/types";
import search from "../services/search";
import SearchCard from "../components/SearchCard";

interface SearchViewProps {}

function SearchView(props: SearchViewProps) {
	const [chosenTags, setChosenTags] = useState<objectType[]>([]);
	const [foundPatterns, setFoundPatterns] = React.useState<IPattern[]>([]);
	const [searchType, setSearchType] = useState<string>("tag");
	const [tagsActive, setTagsActive] = useState<boolean>(false);
	const [tags, setTags] = useState<Tags>([{ id: 0, name: "Loading..." }]);
	const [queryString, setQueryString] = useState<string>("");
	const [handleChecks, setHandleChecks] = useState<boolean>(false);

	const updateSearchType = (e: any) => {
		setFoundPatterns([]);
		setQueryString("");
		setSearchType(e.target.value);
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
	 * Calls to get all the tags when this page is first loaded to populate the tag list for users to interact with
	 */
	useEffect(() => {
		fetch(process.env.ROOT_URL + "/api/tags")
			.then((res) => res.json())
			.then((data) => setTags(data))
			.catch((e) => console.log("[fetch erorr]", e));
	}, [handleChecks]);

	/**
	 * Currently only handles the search after the submit button is clicked on the tags, looking to perhaps refactor this so the trigger is debounced and acts similar to the text search trigger. Doesn't make sense to have two different triggers imo
	 */
	const searchTrigger = () => {
		search
			.findByTags(chosenTags)
			.then((res) => setFoundPatterns(res.finalPatterns));
	};

	/**
	 * Takes the found patterns from any search and formats the results into React friendly card components / a no patterns found message
	 * @returns an array of PatternCards, a React component or a message saying there are no patterns with those params
	 */
	const resultsHtml = foundPatterns ? (
		foundPatterns.map((pattern, i) => (
			<div className="border rounded w-100 bg-soft m-2 border-primary">
				<SearchCard pattern={pattern} key={`patternCard-${i}`} />
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

	const clearSelection = () => {
		setChosenTags([]);
		setHandleChecks((prev) => !prev);
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

		const updatedChosenTags = [...chosenTags];
		const tagIndex = updatedChosenTags.findIndex(
			(tag) => tag.name === tagToToggle.name
		);

		if (tagIndex !== -1) {
			console.log(`Removed`);
			updatedChosenTags.splice(tagIndex, 1);
		} else {
			console.log(`Added`);
			updatedChosenTags.push(tagToToggle);
		}
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
									key={tag.name}
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
						<button
							className={`${
								tagsActive ? "visible" : "invisible"
							}  btn btn-soft small p-2 m-2 text-muted border border-primary btn btn-primary mx-auto`}
						>
							Strict Comparison
						</button>
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
					<div className="w-75 d-flex flex-column mx-auto mt-5">
						{resultsHtml}
					</div>
				</>
			)}
		</div>
	);
}

export default SearchView;
