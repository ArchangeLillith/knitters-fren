import { ResultSetHeader } from 'mysql2';

import baseService from './base';

/**
 * Updates the favorite patterns of the user id that's passed in
 * @param id - the user
 * @param payload - the updated favorite list
 */
const addFavorite = async (author_id: string, pattern_id: string) => {
	const payload = { pattern_id };
	const result: ResultSetHeader = await baseService.post(
		`/api/favorite_patterns/${author_id}`,
		payload
	);
	return result;
};
const removeFavorite = async (author_id: string, pattern_id: string) => {
	const result: ResultSetHeader = await baseService.destroy(
		`/api/favorite_patterns/${author_id}/${pattern_id}`
	);
	return result;
};
export default {
	addFavorite,
	removeFavorite,
};
