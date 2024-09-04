import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { IAuthorsTable } from "../../types";
import { Query, QueryMetadata } from "../query";

//API calls
const all = (): Promise<IAuthorsTable> =>
	Query<IAuthorsTable>("SELECT * FROM authors;");

const one = (id: string): Promise<IAuthorsTable> =>
	Query<IAuthorsTable>(`SELECT * FROM authors WHERE id = ?;`, [id]);

//Authorization calls
const find = (val: string): Promise<IAuthorsTable[]> =>
	Query<IAuthorsTable[]>(`SELECT * FROM authors WHERE email = ?;`, [val]);

const insert = (values: {
	name: string;
	email: string;
	handle: string;
}): Promise<ResultSetHeader> => {
	return QueryMetadata("INSERT INTO authors SET ?", [values]);
};

export default { all, one, find, insert };
