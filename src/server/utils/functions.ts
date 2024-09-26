// utils/transformPattern.ts

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
