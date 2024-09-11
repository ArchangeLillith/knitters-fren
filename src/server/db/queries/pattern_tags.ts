import type { ResultSetHeader } from "mysql2";
import type { IAuthorsTable, IPatternTable, IPatternTags } from "../../types";
import { Query, QueryMetadata } from "../query";

//GET all tags
const all = (): Promise<IPatternTags[]> =>
	Query<IPatternTags[]>(
		`
SELECT 
	tags.id AS id, 
	tags.name AS name
FROM 
	tags
		`
	);
//GET all tags by the pattern ID
const allByPatternId = (id: string): Promise<IPatternTags[]> =>
	Query<IPatternTags[]>(
		`
SELECT 
	tags.id AS id, 
	tags.name AS name
FROM 
	tags
		JOIN 
		pattern_tags ON tags.id = pattern_tags.tag_id
	WHERE pattern_tags.pattern_id = ?`,
		[id]
	);

//GET one pattern, joined to show the authors name
const one = (id: string): Promise<(IPatternTable & IAuthorsTable)[]> =>
	Query<(IPatternTable & IAuthorsTable)[]>(
		`
SELECT 
  patterns.*,
  authors.name 
FROM 
  patterns 
      JOIN 
			authors ON authors.id = patterns.author_id
  WHERE patterns.id = ?;`,
		[id]
	);

//POST the original tags to the pattern
const insert = (values: [string, number][]): Promise<ResultSetHeader> => {
	// Dynamically create placeholders for however many pairs of numbers are in the array
	const placeholders = values.map(() => `(?, ?)`).join(", ");

	// Flatten the values array, [[1, 2], [3, 4]] becomes [1, 2, 3, 4]
	const flattenedValues = values.flat();

	const sql = `
    INSERT INTO pattern_tags (pattern_id, tag_id)
    VALUES ${placeholders};
  `;

	// Execute the query with the flattened values array
	return QueryMetadata(sql, flattenedValues);
};

//DELETE all tags from one pattern
const destroyAllBasedOnPatternId = (id: string): Promise<ResultSetHeader> =>
	QueryMetadata("DELETE FROM pattern_tags WHERE pattern_id = ?", [id]);

//PATCH a tag
//This will only be used by the admin side, there's no reason for people to have access to this
//This will only be used for spelling corrections to the tag, the ID is associated with the tag so if the tag goes from A => B, suddenly instead of lace weight you're using ultra chunky for your wedding shawl lol
const update = (values: {
	name: string;
	id: number;
}): Promise<ResultSetHeader> =>
	QueryMetadata("UPDATE pattern_tags SET name = ? WHERE id = ?", [
		values.name,
		values.id,
	]);

export default {
	all,
	allByPatternId,
	one,
	insert,
	destroyAllBasedOnPatternId,
	update,
};
