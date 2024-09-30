import React, { useContext, useEffect, useMemo, useState } from 'react';

import { AuthContext } from '../components/AuthComponents/AuthProvider';
import AuthWrapper from '../components/AuthComponents/AuthWrapper';
import Container from '../components/Container';
import PatternCard from '../components/PatternComponents/PatternCard';
import useFetchData from '../hooks/useFetchData';
import { PatternObject } from '../utils/types';

const FavoritePatterns = () => {
	const { authState } = useContext(AuthContext);
	const author_id = authState.authorData?.id;
	const [patterns, setPatterns] = useState<PatternObject[]>([]);
	const [noFavorites, setNoFavorites] = useState<boolean>(false);

	const fetchConfigs = useMemo(
		() => [
			{
				key: 'patterns',
				url: `/api/favorite_patterns/${author_id}`,
			},
		],
		[author_id]
	);

	const { data, loading, error } = useFetchData<{ patterns: PatternObject[] }>(
		fetchConfigs
	);

	useEffect(() => {
		console.log(`DATAAA`, data);
		if (!data || !data.patterns) return;
		if (data.patterns.length === 0) {
			setNoFavorites(true);
		} else {
			setPatterns(data.patterns);
			setNoFavorites(false);
		}
	}, [data]);

	if (loading) return <p>Loading your favorite patterns...</p>;
	if (error) return <p>An error occurred while fetching favorites...</p>;

	return (
		<AuthWrapper>
			<Container>
				<div className="w-75 d-flex flex-column mx-auto mt-5">
					{patterns.length > 0 ? (
						patterns.map(pattern => (
							<div
								className="rounded w-100 bg-soft m-2 border-pink"
								key={`${pattern.pattern.id}-container`}
							>
								<PatternCard patternObject={pattern} />
							</div>
						))
					) : noFavorites ? (
						<div>No favs TT_TT</div>
					) : null}
				</div>
			</Container>
		</AuthWrapper>
	);
};

export default FavoritePatterns;
