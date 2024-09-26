import React, { useContext, useEffect, useMemo, useState } from 'react';

import { AuthContext } from '../components/AuthComponents/AuthProvider';
import AuthWrapper from '../components/AuthComponents/AuthWrapper';
import Container from '../components/Container';
import PatternCard from '../components/PatternComponents/PatternCard';
import useFetchData from '../hooks/useFetchData';
import { Pattern } from '../utils/types';

const FavoritePatterns = () => {
	const { authState } = useContext(AuthContext);
	const [patterns, setPatterns] = useState<Pattern[]>([]);
	const [noFavoritesError, setNoFavoritesError] = useState<boolean>(false);

	const fetchConfigs = useMemo(
		() => [{ key: 'patterns', url: `/api/favorite_patterns/${authState.id}` }],
		[authState.id]
	);

	const { data, loading, error } = useFetchData<{ patterns: Pattern[] }>(
		fetchConfigs
	);

	useEffect(() => {
		if (!data || !data.patterns) return;
		if (data.patterns.length === 0) {
			setNoFavoritesError(true);
		} else {
			setPatterns(data.patterns);
			setNoFavoritesError(false);
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
								key={`${pattern.id}-container`}
							>
								<PatternCard pattern={pattern} />
							</div>
						))
					) : noFavoritesError ? (
						<div>No favs TT_TT</div>
					) : null}
				</div>
			</Container>
		</AuthWrapper>
	);
};

export default FavoritePatterns;
