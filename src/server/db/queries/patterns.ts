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

//TODO GET all patterns by _____ (tag, author, name)(do this by a checkbox on the front end so we don't have to join like three tables.... Or maybe that's okay?)

//POST a pattern
const insert = (values: IPatternTable) =>
	Query("INSERT INTO patterns SET ?", [values]);

//DELETE a pattern
const destroy = (id: string, author_id: string) =>
	Query("DELETE FROM patterns WHERE id = ? AND author_id = ?", [id, author_id]);

//PATCH a pattern
const update = (patternDTO: IPatternTable, id: string, author_id: string) =>
	Query("UPDATE patterns SET ? WHERE id = ? AND author_id = ?", [
		patternDTO,
		id,
		author_id,
	]);

export default { all, one, insert, destroy, update };
