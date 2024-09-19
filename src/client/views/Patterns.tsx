import React, { useEffect } from "react";
import { Pattern } from "../utils/types";
import PatternCard from "../components/PatternComponents/PatternCard";
import patternService from "../services/pattern";
import Container from "../components/Container";

const Patterns = () => {
	const [patterns, setPatterns] = React.useState<Pattern[]>([]);

	/**
	 * This fetches all the patterns on load once from the databse and sets them in state to display them
	 */
	useEffect(() => {
		patternService
			.getAllPatterns()
			.then((data) => setPatterns(data))
			.catch((e) => alert(e));
	}, []);

	return (
		<Container>
			<div className="w-75 d-flex flex-column mx-auto mt-5">
				{patterns.map((pattern) => (
					<div
						className="rounded w-100 bg-soft m-2 border-pink"
						key={`${pattern.id}-container`}
					>
						<PatternCard pattern={pattern} />
					</div>
				))}
			</div>
		</Container>
	);
};

export default Patterns;
