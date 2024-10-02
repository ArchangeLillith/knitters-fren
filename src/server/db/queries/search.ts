import type { PatternObjectQuery } from '../../types';
import { Query } from '../query';

const findByAuthor = (author: string): Promise<PatternObjectQuery[]> =>
	Query<PatternObjectQuery[]>(
		/*sql */ `
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
        	a.username LIKE concat ('%', ?, '%')
      GROUP BY
        p.id;
		`,
		[author]
	);

const findByTitle = (title: string): Promise<PatternObjectQuery[]> =>
	Query<PatternObjectQuery[]>(
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
				p.title LIKE concat ('%', ?, '%')
			GROUP BY
				p.id;
		`,
		[title]
	);

const findByContent = (content: string): Promise<PatternObjectQuery[]> =>
	Query<PatternObjectQuery[]>(
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
				p.content LIKE concat ('%', ?, '%')
			GROUP BY
				p.id;
		`,
		[content]
	);

//Tags query
const findByTags = (tag: number): Promise<PatternObjectQuery[]> =>
	Query<PatternObjectQuery[]>(
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
				t.id = ?
			GROUP BY
				p.id;
		`,
		[tag]
	);

const findByTagsStrict = (tags: number[]): Promise<PatternObjectQuery[]> =>
	Query<PatternObjectQuery[]>(
		/* sql */ `
			SELECT
				p.id,
				p.author_id,
				p.title,
				p.content,
				p.created_at
			FROM
				kf_patterns p
				JOIN kf_pattern_tags pt ON p.id = pt.pattern_id
				JOIN kf_tags t ON pt.tag_id = t.id
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
