import { Query } from "../pool";
import { IAuthorsTable, IPatternTable } from "../../types";

//Title query
const findByTitle = (title: string) =>
	Query<IPatternTable[]>(
		`SELECT * FROM patterns WHERE title LIKE concat('%', ?, '%')`,
		[title]
	);

const findByContent = (content: string) =>
	Query<IPatternTable[]>(
		`SELECT * FROM patterns WHERE content LIKE concat('%', ?, '%')`,
		[content]
	);

//Tags query
const findByTags = (tag: number) =>
	Query<IPatternTable[]>(
		`SELECT p.id, p.author_id, p.title, p.content, p.created_at
		FROM patterns p
			JOIN pattern_tags pt ON p.id = pt.pattern_id
			JOIN tags t ON pt.tag_id = t.id 
	WHERE t.id = ?;`,
		[tag]
	);

	const findByTagsStrict = (tags: number[]) =>
		Query<IPatternTable[]>(
			`
			SELECT p.id, p.author_id, p.title, p.content, p.created_at
			FROM patterns p
				JOIN pattern_tags pt ON p.id = pt.pattern_id
				JOIN tags t ON pt.tag_id = t.id 
			WHERE t.id IN (${tags.map(() => '?').join(', ')})
			GROUP BY p.id
			HAVING COUNT(DISTINCT t.id) = ?;
			`,
			[...tags, tags.length]
		);

// const one = (id: string) =>
// 	Query<IAuthorsTable[]>(`SELECT * FROM authors WHERE id = ?;`, [id]);

// //Authorization calls
// const find = (col: string, val: string) =>
// 	Query<IAuthorsTable[]>(`SELECT * FROM authors WHERE ?? = ?;`, [col, val]);

// const insert = (values: { name: string; email: string; handle: string }) => {
// 	Query("INSERT INTO authors SET ?", values);
// };

export default { findByTitle, findByTags, findByContent, findByTagsStrict };
