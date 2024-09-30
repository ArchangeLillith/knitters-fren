import React, { useContext } from 'react';
import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5';

import { AuthContext } from '../AuthComponents/AuthProvider';

interface FavoriteHeartIconProps {
	patternId: string;
	size: number;
}

const FavIcon: React.FC<FavoriteHeartIconProps> = ({ patternId, size }) => {
	const { authState, handleFavPatternChange } = useContext(AuthContext);
	if (authState.authorData?.patternsFavorited?.includes(patternId)) {
		return (
			<button
				onClick={handleFavPatternChange}
				id={patternId}
				className="heart-btn"
			>
				<IoHeartSharp id={patternId} size={size} />
			</button>
		);
	} else {
		return (
			<button
				onClick={handleFavPatternChange}
				id={patternId}
				className="heart-btn"
			>
				<IoHeartOutline id={patternId} size={size} />
			</button>
		);
	}
};

export default FavIcon;
