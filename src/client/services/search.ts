import baseService from './base';
import patternTagsService from './pattern-tags';
import { Pattern, PatternObject, Tag } from '../utils/types';

/**
 * Searches the databse for ANY author that matches the searchString
 * @param searchString - the string to search by
 * @returns an array of patterns that match the search or an empty array
 */
const findByAuthor = async (searchString: string) => {
	try {
		const { message, patterns } = await baseService.get(
			`/api/search/author/${searchString}`
		);
		const results = await handlePatternResults(message, patterns);
		return results;
	} catch (error) {
		console.error('Error fetching patterns:', error);
		throw error;
	}
};

/**
 * Searches the databse for ANY title that matches the searchString
 * @param searchString - the string to search by
 * @returns an array of patterns that match the search or an empty array
 */
const findByTitle = async (searchString: string) => {
	console.log(`find by title`);
	try {
		const { message, patterns } = await baseService.get(
			`/api/search/title/${searchString}`
		);
		const results = await handlePatternResults(message, patterns);
		return results;
	} catch (error) {
		console.log(`Error in findbytitle`);
		throw error;
	}
};

/**
 * Searches the database to find any pattern that has a content that includes the search string
 * @param searchString - the query string
 * @returns an array of patterns that have the search string in the content section
 */
const findByContent = async (searchString: string) => {
	const { message, patterns } = await baseService.get(
		`/api/search/content/${searchString}`
	);
	const results = await handlePatternResults(message, patterns);
	return results;
};

/**
 * Searches the database to find any pattern that includes AT LEAST ONE of the tags
 * @param payload - an array of objects of type {id: number(?), name: string}
 * @returns
 */
const findByTags = async (payload: Tag[]) => {
	const response = await baseService.post(`/api/search/tag`, {
		tagList: JSON.stringify(payload),
	});
	if (response.finalPatterns.length === 0) {
		throw new Error('No patterns found');
	}
	return response;
};

/**
 * Searches the database to find any pattern that EXACTLY matches ALL the tags selected
 * @param payload - an array of strings that are the names of tags to search by
 * @returns an array of patterns that has all the tags in the payload
 */
const findByTagsStrict = async (payload: Tag[]) => {
	const response = await baseService.post(`/api/search/tag/strict`, {
		tagList: JSON.stringify(payload),
	});
	if (response.finalPatterns.length === 0 || response === 404) {
		return response.status(204).json({ message: 'No patterns found' });
	}
	return response;
};

const handlePatternResults = async (message: string, patterns: Pattern[]) => {
	const patternObjects: PatternObject[] = [];
	if (message === 'no pattern') {
		return { message: 'no patterns', data: [] };
	}

	for (const pattern of patterns) {
		const tags = await patternTagsService.getByPatternId(pattern.id);
		patternObjects.push({ pattern, tags });
	}

	return { patternObjects, message: 'patterns found' };
};

export default {
	findByAuthor,
	findByTitle,
	findByTags,
	findByContent,
	findByTagsStrict,
};
