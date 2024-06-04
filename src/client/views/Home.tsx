import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import PatternCard from "../components/PatternCard";
import { IPattern, dummyPattern } from "../utils/types";
import patternService from "../services/pattern";
import { sortPatterns } from "../utils/patterns.utils";

interface HomeProps {}

const Home = (props: HomeProps) => {
	const [patterns, setPatterns] = React.useState<IPattern[]>([]);
	const [featured, setFeatured] = React.useState<IPattern>();
	const [mostRecent, setMostRecent] = React.useState<IPattern[]>([]);

	useEffect(() => {
		patternService.getAllPatterns().then((data) => {
			const sortedPatterns: IPattern[] = sortPatterns(data, "date");
			setPatterns(data);
			setFeatured(patterns[Math.floor(Math.random() * (patterns.length - 1))]);
			setMostRecent(sortedPatterns.splice(0, 3));
		});

		// .catch((e) => Toast.error(e.message));
	}, []);

	const tags: string[] = ["DPNS", "Circular", "US 7", "Fingering Weight"];
	return (
		<Container>
			<div className="d-flex flex-row justify-content-around my-4">
				<div
					id="featured-patterns"
					className="mt-5 bg-bright rounded justify-content-center d-flex flex-column align-items-center "
					style={{ maxWidth: "50%" }}
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
					{mostRecent.map((pattern, index) => (
						<>
							<div
								className="d-flex flex-row justify-content-around"
								key={`feature-wrapper-${index}`}
							>
								<Link
									to={`/patterns/${pattern.id}`}
									key={`feature-title-${index}`}
									className="lead w-50"
								>
									{pattern.title}
								</Link>
								<p className="small w-75" key={`feature-para-${index}`}>
									{pattern.content.slice(0, 150)}...
								</p>
								{tags.map((tag) => (
									<div key={`${tag}-${index}`} className="pl-1">
										<div key={`${tag}`} className="btn btn-sm btn-primary m-1">
											{tag}
										</div>
									</div>
								))}
							</div>
							<hr />
						</>
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

export default Home;
