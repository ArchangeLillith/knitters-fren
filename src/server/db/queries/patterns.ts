import { Query } from "../pool";
import { IAuthorsTable, IPatternTable } from "../../types";

//GET all patterns, joined to show the name of the author
const all = () =>
	Query<(IPatternTable & IAuthorsTable)[]>(`
	SELECT 
		patterns.*,
		authors.name 
	FROM 
		patterns 
				JOIN 
		authors ON authors.id = patterns.author_id;`);

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

//TODO GET all patterns by _____ (tag, author, name)(do this by a checkbox on the front end so we don't have to join like three tables.... Or maybe that's okay?)

//POST a pattern
const insert = (values: IPatternTable) =>
	Query("INSERT INTO patterns SET ?", [values]);

//DELETE a pattern
const destroy = (id: string) =>
	Query("DELETE FROM patterns WHERE id = ?", [id]);

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

export default { all, one, insert, destroy, update, oneByTitle };
