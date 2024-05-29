import { Query } from "../pool";

//All optional for using with custom select statements
export interface UsersTable {
	id?: string;
	email?: string;
	password?: string;
	created_at?: string;
	first_name?: string;
	last_name?: string;
}

const find = (col: string, val: string) =>
	Query<UsersTable[]>(`SELECT * FROM users WHERE ?? = ?;`, [col, val]);

const insert = (values: {
	id: string;
	email: string;
	passowrd: string;
	first_name: string;
	last_name: string;
}) => {
	Query("INSERT INTO users SET ?", values);
};

export default { find, insert };
