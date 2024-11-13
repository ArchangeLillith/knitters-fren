import type { ResultSetHeader } from 'mysql2';

import type {
	AuthorsTable,
	PatternObjectQuery,
	PatternTable,
} from '../../types';
import { Query, QueryMetadata } from '../query';

//GET all patterns, joined to show the name of the author
const all = (): Promise<PatternObjectQuery[]> =>
	Query<PatternObjectQuery[]>(/* sql */ `
		SELECT
			p.*,
			a.username,
			JSON_ARRAYAGG (JSON_OBJECT ('id', t.id, 'name', t.name)) AS tags
		FROM
			kf_patterns p
			JOIN kf_authors a ON a.id = p.author_id
			LEFT JOIN kf_pattern_tags pt ON pt.pattern_id = p.id
			LEFT JOIN kf_tags t ON t.id = pt.tag_id
		GROUP BY
			p.id;
	`);

//GET all pattern authored by one author_id
const allByAuthor = (
	author: string
): Promise<(PatternTable & AuthorsTable)[]> =>
	Query<(PatternTable & AuthorsTable)[]>(
		/* sql */ `
			SELECT
				kf_patterns.*,
				kf_authors.username
			FROM
				kf_patterns
				JOIN kf_authors ON kf_authors.id = kf_patterns.author_id
			WHERE
				kf_patterns.author_id = ?;
		`,
		[author]
	);

//GET one pattern, joined to show the authors name
const oneById = async (id: string): Promise<PatternObjectQuery | null> => {
	const results = await Query<PatternObjectQuery>(
		/* sql */ `
			SELECT
				p.*,
				a.username,
				JSON_ARRAYAGG (JSON_OBJECT ('id', t.id, 'name', t.name)) AS tags
			FROM
				kf_patterns p
				JOIN kf_authors a ON a.id = p.author_id
				LEFT JOIN kf_pattern_tags pt ON pt.pattern_id = p.id
				LEFT JOIN kf_tags t ON t.id = pt.tag_id
			WHERE
				p.id = ?
			GROUP BY
				p.id;
		`,
		[id]
	);

	return results[0] || null;
};

const oneByTitle = (title: string): Promise<PatternTable & AuthorsTable> =>
	Query<PatternTable & AuthorsTable>(
		/* sql */ `
			SELECT
				kf_patterns.*,
				kf_authors.username
			FROM
				kf_patterns
				JOIN kf_authors ON kf_authors.id = kf_patterns.author_id
			WHERE
				kf_patterns.title = ?;
		`,
		[title]
	);

//POST a pattern
// this does not include any tags, they're set elsewhere
const insert = async (values: PatternTable): Promise<ResultSetHeader> => {
	const { title, content, id, author_id, link, paid } = values;

	try {
		const sanitizedValues = [title, content, id, author_id, link, paid];
		const returnedHeaders = await QueryMetadata(
			/* sql */ 'INSERT INTO kf_patterns (title, content, id, author_id, link, paid) VALUES (?, ?, ?, ?, ?, ?)',
			sanitizedValues
		);
		return returnedHeaders;
	} catch (error) {
		// Handle any errors that may occur
		console.error('Error executing query:', error);
		throw error;
	}
};

//DELETE a pattern
const destroy = (id: string): Promise<ResultSetHeader> =>
	QueryMetadata(/* sql */ 'DELETE FROM kf_patterns WHERE id = ?', [id]);

//PATCH a pattern
const update = (patternDTO: {
	id: string;
	title: string;
	link: string | undefined;
	paid: 'true' | 'false';
	content: string;
}): Promise<ResultSetHeader> =>
	QueryMetadata(
		/* sql */ 'UPDATE kf_patterns SET content = ?, title = ?, paid = ?, link = ? WHERE id = ?',
		[
			patternDTO.content,
			patternDTO.title,
			patternDTO.paid,
			patternDTO.link,
			patternDTO.id,
		]
	);

const updateAuthorToBanned = (id: string): Promise<ResultSetHeader> =>
	QueryMetadata(
		/* sql */ 'UPDATE kf_patterns SET author_id = "779e05a4-8988-4641-a2e5-5d9bb8391b65" WHERE id = ?',
		[id]
	);

//GET tags for one pattern, joined to show the authors name
const one = (id: string): Promise<(PatternTable & AuthorsTable)[]> =>
	Query<(PatternTable & AuthorsTable)[]>(
		/* sql */ `
			SELECT
				kf_patterns.*,
				kf_authors.name
			FROM
				kf_patterns
				JOIN kf_authors ON kf_authors.id = kf_patterns.author_id
			WHERE
				kf_patterns.id = ?;
		`,
		[id]
	);

export default {
	one,
	all,
	allByAuthor,
	oneById,
	insert,
	destroy,
	update,
	oneByTitle,
	updateAuthorToBanned,
};
