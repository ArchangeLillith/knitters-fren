import type { ResultSetHeader } from 'mysql2';

import type { AuthorsTable } from '../../types';
import { Query, QueryMetadata } from '../query';

//API calls
const all = (): Promise<AuthorsTable> =>
	Query<AuthorsTable>(/* sql */ 'SELECT * FROM kf_authors;');

/**
 * @param id - autor id as a string
 * @returns an object of {
 * id: string,
 * username: string,
 * email: string,
 * role: user | admin,
 * patternsAuthored: [] <- could be null inside as an entry, needs filtering
 * patternsFavorited: [] <- same as last
 * commentsAuthored: [] <- same as last
 * }
 */
const one = async (id: string): Promise<AuthorsTable | undefined> => {
	const authors: AuthorsTable[] = await Query<AuthorsTable[]>(
		/* sql */ `
			SELECT
				a.id,
				a.username,
				a.email,
				a.role,
				JSON_ARRAYAGG (p.id) AS patternsAuthored,
				JSON_ARRAYAGG (fp.pattern_id) AS patternsFavorited,
				JSON_ARRAYAGG (pc.id) AS commentsAuthored
			FROM
				kf_authors a
				LEFT JOIN kf_patterns p ON p.author_id = a.id
				LEFT JOIN kf_favorite_patterns fp ON fp.author_id = a.id
				LEFT JOIN kf_pattern_comments pc ON pc.author_id = a.id
			WHERE
				a.id = ?
			GROUP BY
				a.id,
				a.username,
				a.email,
				a.role;
		`,
		[id]
	);
	return authors.length > 0 ? authors[0] : undefined;
};

//Authorization calls
const find = (val: string): Promise<AuthorsTable[]> =>
	Query<AuthorsTable[]>(
		/* sql */ `
			SELECT
				*
			FROM
				kf_authors
			WHERE
				email = ?
				OR username = ?;
		`,
		[val, val]
	);

const insert = (values: {
	id: string;
	email: string;
	username: string;
	password: string;
	role: string;
}): Promise<ResultSetHeader> => {
	const { id, email, username, password, role } = values;
	return QueryMetadata(
		/* sql */ 'INSERT INTO kf_authors (id, email, username, password, role) VALUES (?,?,?,?,?);',
		[id, email, username, password, role]
	);
};

const ban = (
	id: string,
	email: string,
	username: string
): Promise<ResultSetHeader> => {
	console.log(`ID`, id, email, username);
	return QueryMetadata(
		/* sql */ 'INSERT INTO kf_banned_authors (id, email, username) VALUES (?,?,?);',
		[id, email, username]
	);
};

//DELETE a pattern
const destroy = (id: string): Promise<ResultSetHeader> =>
	QueryMetadata(/* sql */ 'DELETE FROM kf_authors WHERE id = ?;', [id]);

export default { all, one, find, insert, ban, destroy };
