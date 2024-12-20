import React, { useContext, useEffect, useMemo } from 'react';

import { AuthContext } from '../components/AuthComponents/AuthProvider';
import Container from '../components/Container';
import MostRecent from '../components/PatternComponents/MostRecent';
import PatternCard from '../components/PatternComponents/PatternCard';
import useFetchData from '../hooks/useFetchData';
import { sortByDate } from '../utils/patterns.utils';
import { PatternObject, PatternProps, loadingPattern } from '../utils/types';

const Home = () => {
	const { authState, authLoading } = useContext(AuthContext);
	const [patterns, setPatterns] = React.useState<PatternProps>({
		allPatterns: [],
		featured: loadingPattern,
		mostRecent: [],
	});

	const fetchConfigs = useMemo(
		() => (authLoading ? [] : [{ key: 'allPatterns', url: `/api/patterns/` }]),
		[authLoading]
	);

	const { data } = useFetchData<{
		allPatterns: PatternObject[];
	}>(fetchConfigs, authLoading);

	useEffect(() => {
		if (!data || !data.allPatterns || authLoading) return;

		const { allPatterns } = data;
		const freePatterns = allPatterns.filter(pattern => pattern.paid !== 'true');
		const sortedPatterns: PatternObject[] = sortByDate(
			freePatterns
		) as PatternObject[];
		const randomNumber = getRandomInt(freePatterns.length - 1);

		setPatterns(prev => {
			// Only update if the patterns have changed
			if (JSON.stringify(prev.allPatterns) === JSON.stringify(allPatterns)) {
				return prev;
			}
			return {
				allPatterns,
				featured: freePatterns[randomNumber],
				mostRecent: sortedPatterns.slice(0, 3),
			};
		});
	}, [data, authLoading]);

	return (
		<Container>
			<div className="d-flex flex-column flex-lg-row justify-content-around my-4">
				<div className="d-flex align-self-center order-1 order-lg-2">
					<img
						rel="preload"
						alt="site-logo-sleeping-nanachi"
						src="https://knitters-fren.s3.ca-central-1.amazonaws.com/website-images/Nanachi-logo.png"
						className="site-logo-nanachi"
					/>
				</div>
				<div
					id="featured-patterns"
					className="mt-5 bg-bright rounded justify-content-center d-flex flex-column align-items-center order-2 order-lg-1 featured-patterns"
				>
					<div
						className="featured-heading"
						// This can't be moved, it doesn't work in CSS for some reason :(
						style={{ fontFamily: "'Brush Script MT', cursive" }}
					>
						Featured Pattern:
					</div>
					{patterns.featured && (
						<PatternCard pattern={patterns.featured} featured={true} />
					)}
				</div>
			</div>
			<div className="container-fluid container">
				<div className="bg-bright text-white w-120 p-4 rounded flex flex-column">
					<div>
						<h4 className="text-soft">Most Recent Patterns</h4>
					</div>
					{patterns.mostRecent.map(pattern => (
						<MostRecent
							pattern={pattern}
							key={`${pattern.id}-most-recent-row`}
						/>
					))}
				</div>
			</div>
			<div className="container-fluid container">
				<div className="bg-soft w-70 my-3 py-4 rounded">
					<h3 className="mx-4">All Patterns:</h3>
					{patterns.allPatterns.map(pattern => (
						<div
							key={`all-pattern-outer-wrapper-${pattern.title}`}
							className="my-2 w-75 m-auto"
						>
							{pattern.paid === 'true' &&
								authState.authorData &&
								pattern.author_id === authState.authorData.id && (
									<div
										key={`all-pattern-inner-wrapper-${pattern.title}`}
										className="border my-2 border-black rounded"
									>
										<PatternCard pattern={pattern} />
									</div>
								)}
							{pattern.paid === 'false' && (
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
