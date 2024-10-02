import { ResultSetHeader } from 'mysql2';

import type { PatternComment } from '../../types';
import { Query, QueryMetadata } from '../query';

//GET all
const all = (): Promise<PatternComment[]> =>
	Query<PatternComment[]>(/* sql */ `
		SELECT
			kf_pattern_comments.*,
			kf_authors.username
		FROM
			kf_authors
			JOIN kf_pattern_comments ON kf_authors.id = kf_pattern_comments.author_id
	`);

//GET all tags by the pattern ID
const allByPattern = (id: string): Promise<PatternComment[]> =>
	Query<PatternComment[]>(
		/* sql */ `
			SELECT
				kf_pattern_comments.*,
				kf_authors.username
			FROM
				kf_authors
				JOIN kf_pattern_comments ON kf_authors.id = kf_pattern_comments.author_id
			WHERE
				kf_pattern_comments.pattern_id = ?
		`,
		[id]
	);

const addNewComment = async (values: {
	author_id: string;
	pattern_id: string;
	content: string;
}): Promise<ResultSetHeader> => {
	const { author_id, pattern_id, content } = values;
	const sanitizedValues = [author_id, pattern_id, content];
	const returnedHeaders = await QueryMetadata(
		/* sql */ 'INSERT INTO kf_pattern_comments (author_id, pattern_id, content) VALUES (?, ?, ?)',
		sanitizedValues
	);
	return returnedHeaders;
};

export default { all, allByPattern, addNewComment };
