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
	id: string;
	email: string;
	username: string;
	password: string;
	role: string;
}): Promise<ResultSetHeader> => {
	const { id, email, username, password, role } = values;
	return QueryMetadata(
		"INSERT INTO authors (id, email, username, password, role) VALUES (?,?,?,?,?)",
		[id, email, username, password, role]
	);
};

export default { all, one, find, insert };
