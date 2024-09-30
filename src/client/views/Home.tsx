import React, { useContext, useEffect, useMemo } from 'react';

import MostRecentRow from '../components//PatternComponents/MostRecent';
import { AuthContext } from '../components/AuthComponents/AuthProvider';
import Container from '../components/Container';
import PatternCard from '../components/PatternComponents/PatternCard';
import useFetchData from '../hooks/useFetchData';
import { sortByDate } from '../utils/patterns.utils';
import { PatternObject, loadingPattern } from '../utils/types';

interface PatternProps {
	allPatterns: PatternObject[];
	featured: PatternObject;
	mostRecent: PatternObject[];
}

const Home = () => {
	const { authState } = useContext(AuthContext);
	const [patterns, setPatterns] = React.useState<PatternProps>({
		allPatterns: [],
		featured: loadingPattern,
		mostRecent: [],
	});

	const fetchConfigs = useMemo(
		() => [{ key: 'allPatterns', url: `/api/patterns/` }],
		[]
	);

	const { data, loading, error } = useFetchData<{
		allPatterns: PatternObject[];
	}>(fetchConfigs);

	useEffect(() => {
		if (!data || !data.allPatterns) return;

		const { allPatterns } = data;
		console.log(`Alldtat`, allPatterns);

		const freePatterns = allPatterns.filter(
			pattern => pattern.pattern.paid !== 'true'
		);
		const sortedPatterns: PatternObject[] = sortByDate(
			freePatterns
		) as PatternObject[];
		const randomNumber = getRandomInt(freePatterns.length - 1);

		setPatterns({
			allPatterns,
			featured: freePatterns[randomNumber],
			mostRecent: sortedPatterns.slice(0, 3),
		});
	}, [data]);

	if (loading) <p>Loading....</p>;
	if (error) <p>error....</p>;

	return (
		<Container>
			<div className="d-flex flex-row justify-content-around my-4">
				<div
					id="featured-patterns"
					className="mt-5 bg-bright rounded justify-content-center d-flex flex-column align-items-center "
					style={{ maxWidth: '50%', paddingRight: '3%', paddingLeft: '3%' }}
				>
					<div
						style={{
							fontFamily: "'Brush Script MT', cursive",
							fontSize: '35px',
							paddingTop: '3%',
						}}
					>
						Featured Pattern:
					</div>
					{patterns.featured && (
						<PatternCard patternObject={patterns.featured} featured={true} />
					)}
				</div>
				<div className="mb-5">
					<img
						alt="site-logo-sleeping-nanachi"
						src="/images/Nanachi-logo.png"
						className="py-4"
						style={{ height: '130%' }}
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
					{patterns.mostRecent.map(pattern => (
						<MostRecentRow
							tags={pattern.tags}
							pattern={pattern.pattern}
							key={`${pattern.pattern.id}-most-recent-row`}
						/>
					))}
				</div>
			</div>
			<div className="container-fluid container">
				<div className="bg-soft w-70 my-3 py-4 rounded">
					<h3 className="mx-4">All Patterns:</h3>
					{patterns.allPatterns.map(pattern => (
						<div
							key={`all-pattern-outer-wrapper-${pattern.pattern.title}`}
							className="my-2 w-75 m-auto"
						>
							{pattern.pattern.paid === 'true' &&
								authState.authorData &&
								pattern.pattern.author_id === authState.authorData.id && (
									<div
										key={`all-pattern-inner-wrapper-${pattern.pattern.title}`}
										className="border my-2 border-black rounded"
									>
										<PatternCard patternObject={pattern} />
									</div>
								)}
							{pattern.pattern.paid === 'false' && (
								<div
									key={`all-pattern-inner-wrapper-${pattern.pattern.title}`}
									className="border my-2 border-black rounded"
								>
									<PatternCard patternObject={pattern} />
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
