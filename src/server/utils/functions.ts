import {
	AuthorsTable,
	PatternObject,
	PatternObjectQuery,
} from '../types/index';

export const formatAndRemovePaid = (
	array: PatternObjectQuery[],
	author_id: string | null
): PatternObject[] => {
	const formatted: PatternObject[] = queryToPatternObject(array);
	console.log(`formatted`, formatted);
	const withoutPaid: PatternObject[] = removePaid(formatted, author_id);
	console.log(`Withoutpaid`, withoutPaid);
	return withoutPaid;
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
	return patternsObject;
};

export const transformPatternObject = (
	result: PatternObjectQuery
): PatternObject => {
	const pattern: PatternObject = {
		id: result.id,
		title: result.title,
		content: result.content,
		author_id: result.author_id,
		paid: result.paid,
		created_at: result.created_at,
		link: result.link,
		username: result.username,
		tags: result.tags,
	};
	return pattern;
};

export const removePaid = (
	patterns: PatternObject[],
	author_id: string | null
): PatternObject[] => {
	return patterns.filter(pattern => {
		return (
			pattern.paid === 'false' ||
			(pattern.paid && pattern.author_id === author_id)
		);
	});
};

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
