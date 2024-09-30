import {
	AuthorsTable,
	PatternObject,
	PatternObjectQuery,
	PatternTable,
	Tag,
} from '../types/index';

export const transformPatternObject = (
	result: PatternObjectQuery
): PatternObject => {
	console.log(`RESULT,`, result);
	const tags: Tag[] = result.tags;
	const pattern: PatternTable = {
		id: result.id,
		title: result.title,
		content: result.content,
		author_id: result.author_id,
		paid: result.paid,
		created_at: result.created_at,
		link: result.link,
		username: result.username,
	};

	return { pattern, tags };
};

export const queryToPatternObject = (queryReturn: PatternObjectQuery[]) => {
	if (queryReturn.length === 0) {
		return [];
	}
	const patternsObject: PatternObject[] = [];
	for (const patternObj of queryReturn) {
		const patternObject: PatternObject = transformPatternObject(patternObj);
		patternsObject.push(patternObject);
	}
	console.log(`Pattern obj,`, patternsObject);
	return patternsObject;
};

/**
 * Filters out any null or undefined values from the array
 * @param arr - the array to clean
 * @returns an array without null or undefined values
 */
function cleanArray<T>(array: (T | null | undefined)[]): T[] {
	return Array.from(
		new Set(array.filter(item => item !== null && item !== undefined))
	);
}
/**
 * Cleans the author arrays so no null values appear
 * @param author
 * @returns the author without null values in any of the arrays
 */
export const cleanAuthor = (author: AuthorsTable) => {
	author.patternsFavorited = cleanArray(author.patternsFavorited);
	author.commentsAuthored = cleanArray(author.commentsAuthored);
	author.patternsAuthored = cleanArray(author.patternsAuthored);
	return author;
};
