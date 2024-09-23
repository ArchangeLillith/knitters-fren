import React, { useMemo } from 'react';

import Container from '../components/Container';
import PatternCard from '../components/PatternComponents/PatternCard';
import useFetchData from '../hooks/useFetchData';
import { Pattern } from '../utils/types';

const Patterns = () => {
	// Memoize the fetch configuration to prevent re-renders causing unnecessary re-fetches
	const fetchConfigs = useMemo(
		() => [{ key: 'patterns', url: '/api/patterns' }],
		[]
	);

	const { data, loading, error } = useFetchData<{ patterns: Pattern[] }>(
		fetchConfigs
	);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>; // Display error message from the hook
	}

	return (
		<Container>
			<div className="w-75 d-flex flex-column mx-auto mt-5">
				{data.patterns.map(pattern => (
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
