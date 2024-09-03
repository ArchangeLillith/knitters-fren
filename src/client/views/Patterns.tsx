import React, { useEffect } from "react";
import { IPattern } from "../utils/types";
import PatternCard from "../components/PatternCard";
import patternService from "../services/pattern";
import Container from "../components/Container";
import Toast from "../components/Toast";

interface PatternsProps {}

const Patterns = (props: PatternsProps) => {
	const [patterns, setPatterns] = React.useState<IPattern[]>([]);

	/**
	 * This fetches all the patterns on load once from the databse and sets them in state to display them
	 */
	useEffect(() => {
		patternService
			.getAllPatterns()
			.then((data) => setPatterns(data))
			.catch((e) => Toast.failure(e.message));
	}, []);

	return (
		<Container>
			<div className="w-75 d-flex flex-column mx-auto mt-5">
				{patterns.map((pattern) => (
					<div
						className="border rounded w-100 bg-soft m-2 border-primary"
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
