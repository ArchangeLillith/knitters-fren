import { Query } from "../pool";

export interface PatternTable {
	id?: string;
	created_at?: string;
	userid?: string;
	body?: string;
}
export interface UsersTable {
	id?: string;
	email?: string;
	password?: string;
	created_at?: string;
	first_name?: string;
	last_name?: string;
}

//GET all patterns, joined to show the name of the author not their id
const all = () =>
	Query<(PatternTable & UsersTable)[]>(`
SELECT 
  patterns.*,
  authors.name 
FROM 
  patterns 
      JOIN 
  authors ON author.id = patterns.author_id;`);

//GET one pattern, joined to show the authors name not their id
const one = (id: string) =>
	Query<(PatternTable & UsersTable)[]>(
		`
SELECT 
  notes.*,
  users.first_name 
FROM 
  notes 
      JOIN 
  users ON users.id = notes.userid
  WHERE notes.id = ?;`,
		[id]
	);

//TODO GET all patterns by _____ (tag, author, name)(do this by a checkbox on the front end so we don't have to join like three tables.... Or maybe that's okay?)

//POST a pattern
const insert = (values: PatternTable) =>
	Query("INSERT INTO notes SET ?", [values]);

//DELETE a pattern
const destroy = (id: string, userid: string) =>
	Query("DELETE FROM notes WHERE id = ? AND userid = ?", [id, userid]);

//PATCH a pattern
const update = (editedPattern: PatternTable, id: string, userid: string) =>
	Query("UPDATE notes SET ? WHERE id = ? AND userid = ?", [
		editedPattern,
		id,
		userid,
	]);

export default { all, one, insert, destroy, update };
