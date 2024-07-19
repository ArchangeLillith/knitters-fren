import React from "react";
import PatternCard from "../components/PatternCard";
import { IPattern } from "../utils/types";

interface SearchViewProps {
	patterns: IPattern[];
	keyword: string;
	searchType: string;
}

const SearchView = (props: SearchViewProps) => {
	const title = `You are searching for ${props.keyword}`;
	const resultsHtml = props.patterns.map((pattern, i) => {
		return <PatternCard pattern={pattern} key={pattern.id} />;
	});
	return (
		<div>
			<h1>{title}</h1>
			<p>{props.searchType}</p>
		</div>
	);
};

export default SearchView;
