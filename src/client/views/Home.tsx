import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Card from "../components/Card";
import PatternCard from "../components/PatternCard";
import { IPattern, dummyPattern } from "../utils/types";
import patternService from "../services/pattern";

interface HomeProps {}

const Home = (props: HomeProps) => {
	const [patterns, setPatterns] = React.useState<IPattern[]>([]);

	useEffect(() => {
		patternService.getAllPatterns().then((data) => setPatterns(data));
		// .catch((e) => Toast.error(e.message));
	}, []);

	const featuredPattern: IPattern = patterns[1];
	const latestPatterns: IPattern[] = patterns.slice(0, 2);

	const tags: string[] = ["DPNS", "Circular", "US 7", "Fingering Weight"];
	return (
		<Container>
			<div className="row justify-content-around my-5">
				<div className="col-md-6 col-lg-6">
					<img
						alt="site-logo-sleeping-nanachi"
						src="/images/Nanachi-logo.png"
						className="w-50 py-4"
					/>
				</div>

				<div
					id="featured-patterns"
					className="col-md-6 col-lg-6 mt-5 bg-bright rounded justify-content-center align-items-center d-flex flex-column align-items-center"
				>
					<h2 className="my-3">Featured Pattern:</h2>
					{patterns && <PatternCard pattern={featuredPattern} />}
				</div>
			</div>
			<div className="container-fluid container" key="lower-section-container">
				<div
					key="most-recent-wrapper"
					className="bg-bright text-white w-120 p-4 rounded flex flex-column"
				>
					<div>
						<h4>Most Recent Patterns</h4>
					</div>
					{latestPatterns.map((pattern, index) => (
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
