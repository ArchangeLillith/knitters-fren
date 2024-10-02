import baseService from './base';
import { PatternObject, Tag } from '../utils/types';

//* every function should expect a PatternObject[], even it it's empty. We throw a custom error if it's empty
//No need to throw here because it throws lower, and if the array is empty that's handled in the frontend - maybe change this?
//PERHAPS I can throw the author, content and title at the fetch util!!

/**
 * Searches the database to find any pattern that includes AT LEAST ONE of the tags
 * @param payload - an array of objects of type {id: number(?), name: string}
 * @returns
 */
const findByTags = async (payload: Tag[]) => {
	const results: PatternObject[] = await baseService.post(`/api/search/tag`, {
		tagList: JSON.stringify(payload),
	});
	return results;
};

/**
 * Searches the database to find any pattern that EXACTLY matches ALL the tags selected
 * @param payload - an array of strings that are the names of tags to search by
 * @returns an array of patterns that has all the tags in the payload
 */
const findByTagsStrict = async (payload: Tag[]) => {
	const results: PatternObject[] = await baseService.post(
		`/api/search/tag/strict`,
		{
			tagList: JSON.stringify(payload),
		}
	);
	return results;
};

export default {
	findByTags,
	findByTagsStrict,
};
