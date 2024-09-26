import type { PatternObjectQuery, PatternTable } from '../../types';
import { Query } from '../query';

const findByAuthor = (author: string): Promise<PatternObjectQuery[]> =>
	Query<PatternObjectQuery[]>(
		/*sql */ `
			SELECT
        p.*,
        a.username,
        JSON_ARRAYAGG (JSON_OBJECT ('id', t.id, 'name', t.name)) AS tags
      FROM
        patterns p
        JOIN authors a ON a.id = p.author_id
        LEFT JOIN pattern_tags pt ON pt.pattern_id = p.id
        LEFT JOIN tags t ON t.id = pt.tag_id
      WHERE
        a.username = ?
      GROUP BY
        p.id;
		`,
		[author]
	);

const findByTitle = (title: string): Promise<PatternTable[]> =>
	Query<PatternTable[]>(
		/* sql */ `
			SELECT
				*
			FROM
				patterns
			WHERE
				title LIKE concat ('%', ?, '%')
		`,
		[title]
	);

const findByContent = (content: string): Promise<PatternTable[]> =>
	Query<PatternTable[]>(
		/* sql */ `
			SELECT
				*
			FROM
				patterns
			WHERE
				content LIKE concat ('%', ?, '%')
		`,
		[content]
	);

//Tags query
const findByTags = (tag: number): Promise<PatternTable[]> =>
	Query<PatternTable[]>(
		/* sql */ `
			SELECT
				p.id,
				p.author_id,
				p.title,
				p.content,
				p.created_at
			FROM
				patterns p
				JOIN pattern_tags pt ON p.id = pt.pattern_id
				JOIN tags t ON pt.tag_id = t.id
			WHERE
				t.id = ?;
		`,
		[tag]
	);

const findByTagsStrict = (tags: number[]): Promise<PatternTable[]> =>
	Query<PatternTable[]>(
		/* sql */ `
			SELECT
				p.id,
				p.author_id,
				p.title,
				p.content,
				p.created_at
			FROM
				patterns p
				JOIN pattern_tags pt ON p.id = pt.pattern_id
				JOIN tags t ON pt.tag_id = t.id
			WHERE
				t.id IN (${tags.map(() => '?').join(', ')})
			GROUP BY
				p.id
			HAVING
				COUNT(DISTINCT t.id) = ?;
		`,
		[...tags, tags.length]
	);

//Here so I can comment on what's happening cause I can't comment in my SQL query
// SELECT p.id, p.author_id, p.title, p.content, p.created_at
// FROM patterns p
// 	JOIN pattern_tags pt ON p.id = pt.pattern_id
// 	JOIN tags t ON pt.tag_id = t.id
//Filters rows to give only the ones that have ids in the string created by the map
// WHERE t.id IN (${tags.map(() => '?').join(', ')})
// GROUP BY p.id
//We think that this checks against the tags passed in and ensures that the returned patterns match those exaclty
// HAVING COUNT(DISTINCT t.id) = ?;

export default {
	findByAuthor,
	findByTitle,
	findByTags,
	findByContent,
	findByTagsStrict,
};
