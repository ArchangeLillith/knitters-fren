import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { IAuthorsTable, IPatternTable } from "../../types";
import { Query, QueryMetadata } from "../query";

//GET all patterns, joined to show the name of the author
const all = (): Promise<(IPatternTable & IAuthorsTable)[]> =>
	Query<(IPatternTable & IAuthorsTable)[]>(`
	SELECT 
		patterns.*,
		authors.username
	FROM 
		patterns 
				JOIN 
		authors ON authors.id = patterns.author_id;`);

//GET one pattern, joined to show the authors name
const oneById = async (
	id: string
): Promise<(IPatternTable & IAuthorsTable) | null> => {
	const results = await Query<IPatternTable & IAuthorsTable>(
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

const oneByTitle = (title: string): Promise<IPatternTable & IAuthorsTable> =>
	Query<IPatternTable & IAuthorsTable>(
		`
SELECT 
  patterns.*,
  authors.name 
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
const insert = async (values: IPatternTable): Promise<any> => {
	const { title, content, id, author_id } = values;

	try {
		const sanitizedValues = [title, content, id, author_id];
		const returnedHeaders = await QueryMetadata(
			"INSERT INTO patterns (title, content, id, author_id) VALUES (?, ?, ?, ?)",
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
	author_id: string;
	content: string;
	id: string;
}): Promise<ResultSetHeader> =>
	QueryMetadata(
		"UPDATE patterns SET content = ? WHERE id = ? AND author_id = ?",
		[patternDTO.content, patternDTO.id, patternDTO.author_id]
	);

export default { all, oneById, insert, destroy, update, oneByTitle };
