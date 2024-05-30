import { Query } from "../pool";
import { IAuthorsTable } from "../../types";

//API calls
const all = () => Query<IAuthorsTable[]>(`SELECT * FROM authors;`);

const one = (id: string) =>
	Query<IAuthorsTable[]>(`SELECT * FROM authors WHERE id = ?;`, [id]);

//Authorization calls
const find = (col: string, val: string) =>
	Query<IAuthorsTable[]>(`SELECT * FROM authors WHERE ?? = ?;`, [col, val]);

const insert = (values: { name: string; email: string; handle: string }) => {
	Query("INSERT INTO authors SET ?", values);
};

export default { all, one, find, insert };
