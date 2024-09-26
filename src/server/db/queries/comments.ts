import { ResultSetHeader } from 'mysql2';

import type { PatternComment } from '../../types';
import { Query, QueryMetadata } from '../query';

//GET all
const all = (): Promise<PatternComment[]> =>
	Query<PatternComment[]>(/* sql */ `
		SELECT
			pattern_comments.*,
			authors.username
		FROM
			authors
			JOIN pattern_comments ON authors.id = pattern_comments.author_id
	`);

//GET all tags by the pattern ID
const allByPattern = (id: string): Promise<PatternComment[]> =>
	Query<PatternComment[]>(
		/* sql */ `
			SELECT
				pattern_comments.*,
				authors.username
			FROM
				authors
				JOIN pattern_comments ON authors.id = pattern_comments.author_id
			WHERE
				pattern_comments.pattern_id = ?
		`,
		[id]
	);

const addNewComment = async (values: {
	author_id: string;
	pattern_id: string;
	content: string;
}): Promise<ResultSetHeader> => {
	const { author_id, pattern_id, content } = values;
	console.log(`DB query`, author_id, pattern_id, content);

	const sanitizedValues = [author_id, pattern_id, content];
	const returnedHeaders = await QueryMetadata(
		/* sql */ 'INSERT INTO pattern_comments (author_id, pattern_id, content) VALUES (?, ?, ?)',
		sanitizedValues
	);
	return returnedHeaders;
};

export default { all, allByPattern, addNewComment };
