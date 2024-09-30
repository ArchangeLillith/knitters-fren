import {
	PatternObject,
	PatternObjectQuery,
	PatternTable,
	Tag,
} from '../types/index';

export const transformPatternObject = (
	result: PatternObjectQuery
): PatternObject => {
	const tags: Tag[] = result.tags;
	const pattern: PatternTable = {
		id: result.id,
		title: result.title,
		content: result.content,
		author_id: result.author_id,
		paid: result.paid,
		created_at: result.created_at,
		link: result.link,
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
	return patternsObject;
};
