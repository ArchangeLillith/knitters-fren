import React, { useEffect, useState } from "react";
import PatternCard from "../components/PatternCard";
import { IPattern, Tag, Tags, objectType } from "../utils/types";
import { useNavigate } from "react-router-dom";
import search from "../services/search";

interface SearchViewProps {
	patterns: IPattern[];
	keyword: string;
	searchType: string;
}

const SearchView = (props: SearchViewProps) => {
	const navigate = useNavigate();
	const [foundPatterns, setFoundPatterns] = React.useState<IPattern[]>([]);
	const [tags, setTags] = useState<Tags>([{ id: 0, name: "Loading..." }]);
	let chosenTags: objectType[] = [];

	useEffect(() => {
		fetch(process.env.ROOT_URL + "/api/tags")
			.then((res) => res.json())
			.then((data) => setTags(data))
			.catch((e) => console.log("[fetch erorr]", e));
	}, []);

	const searchTrigger = (e: any) => {
		search
			.findByTags(chosenTags)
			.then((res) => setFoundPatterns(res.foundPatterns));
	};

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

	const title = props.keyword;
	const resultsHtml = foundPatterns?.map((pattern, i) => {
		return <PatternCard pattern={pattern} key={pattern.id} />;
	});
	return (
		<div>
			{props.searchType === "tag" ? (
				<>
					<h1>Please choose your tags...</h1>
					<div>
						{tags.map((tag: Tag) => (
							<div
								className="m-1 d-inline-flex btn-group"
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
						<button onClick={searchTrigger}>Search!</button>
					</div>
					{foundPatterns?.length > 0 && (
						<PatternCard pattern={foundPatterns[0]} key="TEST" />
					)}
					{/* {resultsHtml && (
						<div className="container">
							<div className="row">{resultsHtml}</div>
						</div>
					)} */}
				</>
			) : (
				<h1>
					You are searching for
					<span className="fst-italic font-color-primary">{title}</span>
				</h1>
			)}
		</div>
	);
};

export default SearchView;
