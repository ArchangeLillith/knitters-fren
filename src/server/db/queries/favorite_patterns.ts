import { ResultSetHeader } from 'mysql2';

import type { PatternObjectQuery } from '../../types';
import { Query, QueryMetadata } from '../query';

//API calls
const allByAuthorId = (id: string): Promise<PatternObjectQuery[]> =>
	Query<PatternObjectQuery[]>(
		/* sql */ `
			SELECT
				p.id,
				p.title,
				p.content,
				p.created_at,
				fp.author_id,
				fp.pattern_id,
				a.username,
				a.id AS author_id,
				JSON_ARRAYAGG (JSON_OBJECT ('id', t.id, 'name', t.name)) AS tags
			FROM
				authors a
				JOIN kf_favorite_patterns fp ON fp.author_id = a.id
				LEFT JOIN kf_patterns p ON p.id = fp.pattern_id
				LEFT JOIN kf_pattern_tags pt ON pt.pattern_id = p.id
				LEFT JOIN kf_tags t ON t.id = pt.tag_id
			WHERE
				a.id = ?
			GROUP BY
				p.id,
				p.title,
				p.content,
				p.created_at,
				fp.author_id,
				fp.pattern_id,
				a.username;
		`,
		[id]
	);

const addFavorite = async (
	author_id: string,
	pattern_id: string
): Promise<ResultSetHeader> => {
	return QueryMetadata(
		`
		INSERT INTO
			kf_favorite_patterns (author_id, pattern_id)
		VALUES
			(?,?);
	`,
		[author_id, pattern_id]
	);
};
const removeFavorite = async (
	author_id: string,
	pattern_id: string
): Promise<ResultSetHeader> => {
	return QueryMetadata(
		`
		DELETE FROM
			kf_favorite_patterns
		WHERE author_id = ? AND pattern_id = ?;
	`,
		[author_id, pattern_id]
	);
};
export default { allByAuthorId, addFavorite, removeFavorite };
