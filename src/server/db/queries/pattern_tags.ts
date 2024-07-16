import { Query } from "../pool";
import { IAuthorsTable, IPatternTable } from "../../types";

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

const oneByTitle = (title: string) =>
	Query<(IPatternTable & IAuthorsTable)[]>(
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
const destroyAllBasedOnPatternId = (id: string) =>
	Query("DELETE FROM pattern_tags WHERE pattern_id = ?", [id]);

//PATCH a pattern
const update = (patternDTO: {
	author_id: string;
	content: string;
	id: string;
}) =>
	Query("UPDATE patterns SET content = ? WHERE id = ? AND author_id = ?", [
		patternDTO.content,
		patternDTO.id,
		patternDTO.author_id,
	]);

export default {
	allByPatternId,
	one,
	insert,
	destroyAllBasedOnPatternId,
	update,
	oneByTitle,
};
