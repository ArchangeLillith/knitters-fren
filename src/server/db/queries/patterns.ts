import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { AuthorsTable, PatternTable } from "../../types";
import { Query, QueryMetadata } from "../query";

//GET all patterns, joined to show the name of the author
const all = (): Promise<(PatternTable & AuthorsTable)[]> =>
	Query<(PatternTable & AuthorsTable)[]>(`
	SELECT 
		patterns.*,
		authors.username
	FROM 
		patterns 
				JOIN 
		authors ON authors.id = patterns.author_id;`);

//GET all pattern authored by one author_id
const allByAuthor = (
	author: string
): Promise<(PatternTable & AuthorsTable)[]> =>
	Query<(PatternTable & AuthorsTable)[]>(
		`
		SELECT 
			patterns.*,
			authors.username 
		FROM 
			patterns 
					JOIN 
					authors ON authors.id = patterns.author_id
			WHERE patterns.author_id = ?;`,
		[author]
	);

//GET one pattern, joined to show the authors name
const oneById = async (
	id: string
): Promise<(PatternTable & AuthorsTable) | null> => {
	const results = await Query<PatternTable & AuthorsTable>(
		`
SELECT 
  patterns.*,
  authors.username 
FROM 
  patterns 
      JOIN 
			authors ON authors.id = patterns.author_id
  WHERE patterns.id = ?;`,
		[id]
	);

	return results[0] || null;
};

const oneByTitle = (title: string): Promise<PatternTable & AuthorsTable> =>
	Query<PatternTable & AuthorsTable>(
		`
SELECT 
  patterns.*,
  authors.username 
FROM 
  patterns 
      JOIN 
			authors ON authors.id = patterns.author_id
  WHERE patterns.title = ?;`,
		[title]
	);

//TODO GET all patterns by _____ (tag, author, name)(do this by a checkbox on the front end so we don't have to join like three tables.... Or maybe that's okay?)

//POST a pattern
//! this does not include any tags, ensure tags are being set too
const insert = async (values: PatternTable): Promise<any> => {
	const { title, content, id, author_id, link, paid } = values;

	try {
		const sanitizedValues = [title, content, id, author_id, link, paid];
		const returnedHeaders = await QueryMetadata(
			"INSERT INTO patterns (title, content, id, author_id, link, paid) VALUES (?, ?, ?, ?, ?, ?)",
			sanitizedValues
		);
		return returnedHeaders;
	} catch (error) {
		// Handle any errors that may occur
		console.error("Error executing query:", error);
		throw error;
	}
};

//DELETE a pattern
const destroy = (id: string): Promise<ResultSetHeader> =>
	QueryMetadata("DELETE FROM patterns WHERE id = ?", [id]);

//PATCH a pattern
const update = (patternDTO: {
	id: string;
	title: string;
	content: string;
}): Promise<ResultSetHeader> =>
	QueryMetadata("UPDATE patterns SET content = ?, title = ? WHERE id = ?", [
		patternDTO.content,
		patternDTO.title,
		patternDTO.id,
	]);

const updateAuthorToBanned = (id: string): Promise<ResultSetHeader> =>
	QueryMetadata(
		'UPDATE patterns SET author_id = "779e05a4-8988-4641-a2e5-5d9bb8391b65" WHERE id = ?',
		[id]
	);

export default {
	all,
	allByAuthor,
	oneById,
	insert,
	destroy,
	update,
	oneByTitle,
	updateAuthorToBanned,
};
