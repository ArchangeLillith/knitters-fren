import { IAuthorsTable } from "../../types";
import { Query, QueryMetadata } from "../query";

//API calls
const all = (): Promise<IAuthorsTable[]> =>
	Query<IAuthorsTable>("SELECT * FROM authors;");

const one = (id: string): Promise<IAuthorsTable[]> =>
	Query<IAuthorsTable>(`SELECT * FROM authors WHERE id = ?;`, [id]);

//Authorization calls
const find = (col: string, val: string): Promise<IAuthorsTable[]> =>
	Query<IAuthorsTable>(`SELECT * FROM authors WHERE ?? = ?;`, [col, val]);

const insert = (values: {
	name: string;
	email: string;
	handle: string;
}): Promise<void> => {
	return QueryMetadata('INSERT INTO authors SET ?', [values]).then(() => {})
};

export default { all, one, find, insert };
