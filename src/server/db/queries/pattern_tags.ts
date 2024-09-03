import { IAuthorsTable, IPatternTable } from "../../types";
import { Query } from "../query";

//GET all tags by the pattern ID
const allByPatternId = (id: number) =>
	Query<any>(
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
const one = (id: string) =>
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
const insert = (values: [number, number][]) =>
	Query(
		`
    INSERT INTO pattern_tags (pattern_id, tag_id)
    VALUES ?;
  `,
		[values]
	);

//DELETE all tags from one pattern
const destroyAllBasedOnPatternId = (id: number) =>
	Query("DELETE FROM pattern_tags WHERE pattern_id = ?", [id]);

//PATCH a tag
//This will only be used by the admin side, there's no reason for people to have access to this
const update = (values: { name: string; id: number }) =>
	Query("UPDATE pattern_tags SET content = ? WHERE id = ?", [
		values.name,
		values.id,
	]);

export default {
	allByPatternId,
	one,
	insert,
	destroyAllBasedOnPatternId,
	update,
};