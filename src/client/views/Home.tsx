import React, { useEffect } from "react";
import Container from "../components/Container";
import PatternCard from "../components/PatternCard";
import { IPattern } from "../utils/types";
import patternService from "../services/pattern";
import { sortPatterns } from "../utils/patterns.utils";
import MostRecentRow from "../components/MostRecent";
import Toast from "../components/Toast";

interface HomeProps {}

const Home = (props: HomeProps) => {
	const [patterns, setPatterns] = React.useState<IPattern[]>([]);
	//This may blink more than if I left it blank, not sure what the best thing to do is
	const [featured, setFeatured] = React.useState<IPattern>({
		id: "0",
		author_id: "Loading...",
		title: "Loading...",
		content: "Loading...",
		created_at: "Loading...",
	});
	const [mostRecent, setMostRecent] = React.useState<IPattern[]>([]);

	/**
	 * Onload trigger, gets the patterns and sorts them, setting states for featured and most recent tiles
	 */
	useEffect(() => {
		try {
			patternService.getAllPatterns().then((data) => {
				console.log(`DATA`, data);
				const sortedPatterns: IPattern[] = sortPatterns(data, "date");
				setPatterns(data);
				const randomNumber = getRandomInt(data.length - 1);
				setFeatured(data[randomNumber]);
				setMostRecent(sortedPatterns.splice(0, 3));
			});
		} catch {
			(e) => Toast.failure(e.message);
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
					{featured && <PatternCard pattern={featured} featured={true} />}
				</div>
				<div className="mb-5">
					<a
						href="https://x.com/vbnmat"
						target="_blank"
						data-bs-toggle="tooltip"
						data-bs-placement="top"
						title="Meet the artist!"
					>
						<img
							alt="site-logo-sleeping-nanachi"
							src="/images/Nanachi-logo.png"
							className="py-4"
							style={{ height: "130%" }}
						/>
					</a>
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
					{mostRecent.map((pattern) => (
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
					{patterns.map((pattern) => (
						<div
							key={`all-pattern-outer-wrapper-${pattern.title}`}
							className="my-2 w-75 m-auto"
						>
							<div
								key={`all-pattern-inner-wrapper-${pattern.title}`}
								className="border my-2 border-black rounded"
							>
								<PatternCard pattern={pattern} />
							</div>
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
