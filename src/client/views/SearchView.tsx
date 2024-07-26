import React, { useEffect, useState } from "react";
import PatternCard from "../components/PatternCard";
import { IPattern, Tag, Tags, objectType } from "../utils/types";
import { useNavigate } from "react-router-dom";
import search from "../services/search";

interface SearchViewProps {}

function SearchView(props: SearchViewProps) {
	let chosenTags: objectType[] = [];
	const [foundPatterns, setFoundPatterns] = React.useState<IPattern[]>([]);
	const [searchType, setSearchType] = useState<string>("tag");
	const [tags, setTags] = useState<Tags>([{ id: 0, name: "Loading..." }]);
	const [noResults, setNoResults] = useState<boolean>(false);
	const [queryString, setQueryString] = useState<string>("");

	const updateSearchType = (e: any) => {
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
			//Trigger the fetch here on a delay
			search
				.findByTitle(queryString)
				.then((patterns) => setFoundPatterns(patterns));
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
	}, []);

	/**
	 * @param e - The submit button rendered with the tags on the tag view of the search
	 * Currently only handles the search after the submit button is clicked on the tags, lking to perhaps refactor this so the trigger is debounced and acts similar to the text search trigger. Doesn't make sense to have two different triggers imo
	 *
	 */
	const searchTrigger = (e: any) => {
		search
			.findByTags(chosenTags)
			.then((res) => setFoundPatterns(res.finalPatterns));
	};

	/**
	 * Takes the found patterns from any search and formats the results into React friendly card components
	 * @returns an array of PatternCards, a React component
	 */
	const resultsHtml = foundPatterns.map((pattern, i) => {
		return (
			<div
				className="border rounded w-100 bg-soft m-2 border-primary"
				key={`${pattern.id}-container`}
			>
				<PatternCard pattern={pattern} key={`patternCard-${i}`} />
			</div>
		);
	});

	/**
	 * @param e - The tag button that is clicked
	 * Toggles the selected tags as the user clicks them 'on' and 'off', modifying the chosenTags state
	 */
	const tagToggle = (e: any) => {
		//Make the dat the correct format
		const tagToToggle = { id: e.target.id, name: e.target.name };
		//Find the index, -1 if it doesn't exist
		const tagIndex = chosenTags.findIndex(
			(tag) => tag.name === tagToToggle.name
		);

		//If the searched for tag doesn't exist...
		if (tagIndex !== -1) {
			//Splice it, because we have the index
			chosenTags.splice(tagIndex, 1);
		} else {
			//Otherwise add it to the chosenTags array
			chosenTags.push(tagToToggle);
		}
	};

	return (
		<div>
			<div>
				<h3>You are searching by</h3>
				<form className="d-flex">
					<select
						className="form-select mx-2 w-50"
						aria-label="Default select example"
						onChange={updateSearchType}
					>
						<option defaultValue="title" value="title">
							Title
						</option>
						<option value="tag">Tag</option>
						<option value="author">Author</option>
						<option value="content">Content</option>
					</select>
				</form>
			</div>
			{searchType === "tag" ? (
				<>
					<h1 className="text-center mt-5 text-primary">
						Select tags to search by!
					</h1>
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
						<button className="btn btn-primary mx-auto" onClick={searchTrigger}>
							Search!
						</button>
					</div>
					{noResults && (
						<div className="d-flex flex-column">
							<p>Sorry, no patterns exist with those tags</p>
							<img
								src="/images/teacup-nanachi.png"
								alt="teacup-nanachi"
								style={{
									width: "250px",
								}}
							/>
						</div>
					)}
					<div className="w-75 d-flex flex-column mx-auto mt-5">
						{resultsHtml}
					</div>
				</>
			) : (
				<>
					<h1>What do you want to find?</h1>
					<input
						onChange={(e) => setQueryString(e.target.value)}
						value={queryString}
						placeholder="Start typing!"
					></input>
					<div className="w-75 d-flex flex-column mx-auto mt-5">
						{resultsHtml}
					</div>
				</>
			)}
		</div>
	);
}

export default SearchView;
