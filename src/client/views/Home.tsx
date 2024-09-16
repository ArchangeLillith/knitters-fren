import React, { useContext, useEffect } from "react";
import Container from "../components/Container";
import PatternCard from "../components/PatternCard";
import { Pattern } from "../utils/types";
import patternService from "../services/pattern";
import { sortByDate } from "../utils/patterns.utils";
import MostRecentRow from "../components/MostRecent";
import { AuthContext } from "../components/AuthProvider";

interface PatternProps {
	fullList: Pattern[];
	featured: Pattern;
	mostRecent: Pattern[];
}
const Home = () => {
	const { authState } = useContext(AuthContext);
	const [patterns, setPatterns] = React.useState<PatternProps>({
		fullList: [],
		featured: {
			id: "0",
			author_id: "Loading...",
			title: "Loading...",
			content: "Loading...",
			created_at: "Loading...",
		},
		mostRecent: [],
	});

	/**
	 * Onload trigger, gets the patterns and sorts them, setting states for featured and most recent tiles
	 */
	useEffect(() => {
		try {
			patternService.getAllPatterns().then((data) => {
				const fullList = data;
				const freePatterns = fullList.filter(
					(pattern) => pattern.paid !== "true"
				);
				const sortedPatterns: Pattern[] = sortByDate(freePatterns) as Pattern[];
				let randomNumber = getRandomInt(data.length - 1);
				setPatterns({
					fullList: fullList,
					featured: freePatterns[randomNumber],
					mostRecent: sortedPatterns.slice(0, 3),
				});
				console.log(`patterns`, data);
			});
		} catch {
			(e) => alert(e);
		}
	}, []);

	return (
		<Container>
			<div className="d-flex flex-row justify-content-around my-4">
				<div
					id="featured-patterns"
					className="mt-5 bg-bright rounded justify-content-center d-flex flex-column align-items-center "
					style={{ maxWidth: "50%", paddingRight: "3%", paddingLeft: "3%" }}
				>
					<div
						style={{
							fontFamily: "'Brush Script MT', cursive",
							fontSize: "35px",
							paddingTop: "3%",
						}}
					>
						Featured Pattern:
					</div>
					{patterns.featured && (
						<PatternCard pattern={patterns.featured} featured={true} />
					)}
				</div>
				<div className="mb-5">
					<img
						alt="site-logo-sleeping-nanachi"
						src="/images/Nanachi-logo.png"
						className="py-4"
						style={{ height: "130%" }}
					/>
				</div>
			</div>
			<div className="container-fluid container" key="lower-section-container">
				<div
					key="most-recent-wrapper"
					className="bg-bright text-white w-120 p-4 rounded flex flex-column"
				>
					<div>
						<h4 className="text-soft">Most Recent Patterns</h4>
					</div>
					{patterns.mostRecent.map((pattern) => (
						<MostRecentRow
							pattern={pattern}
							key={`${pattern.id}-most-recent-row`}
						/>
					))}
				</div>
			</div>
			<div className="container-fluid container">
				<div className="bg-soft w-70 my-3 py-4 rounded">
					<h3 className="mx-4">All Patterns:</h3>
					{patterns.fullList.map((pattern) => (
						<div
							key={`all-pattern-outer-wrapper-${pattern.title}`}
							className="my-2 w-75 m-auto"
						>
							{pattern.paid === "true" &&
								pattern.author_id === authState.id && (
									<div
										key={`all-pattern-inner-wrapper-${pattern.title}`}
										className="border my-2 border-black rounded"
									>
										<PatternCard pattern={pattern} />
									</div>
								)}
							{pattern.paid === "false" && (
								<div
									key={`all-pattern-inner-wrapper-${pattern.title}`}
									className="border my-2 border-black rounded"
								>
									<PatternCard pattern={pattern} />
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</Container>
	);
};

function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

export default Home;
