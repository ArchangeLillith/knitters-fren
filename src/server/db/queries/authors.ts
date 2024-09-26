import type { ResultSetHeader } from 'mysql2';

import type { AuthorsTable } from '../../types';
import { Query, QueryMetadata } from '../query';

//API calls
const all = (): Promise<AuthorsTable> =>
	Query<AuthorsTable>('SELECT * FROM authors;');

const one = async (id: string): Promise<AuthorsTable | undefined> => {
	const authors: AuthorsTable[] = await Query<AuthorsTable[]>(
		`SELECT * FROM authors WHERE id = ?;`,
		[id]
	);
	return authors.length > 0 ? authors[0] : undefined;
};

//Authorization calls
const find = (val: string): Promise<AuthorsTable[]> =>
	Query<AuthorsTable[]>(
		`SELECT * FROM authors WHERE email = ? OR username = ?;`,
		[val, val]
	);

const insert = (values: {
	id: string;
	email: string;
	username: string;
	password: string;
	role: string;
}): Promise<ResultSetHeader> => {
	const { id, email, username, password, role } = values;
	return QueryMetadata(
		'INSERT INTO authors (id, email, username, password, role) VALUES (?,?,?,?,?);',
		[id, email, username, password, role]
	);
};

const ban = (
	id: string,
	email: string,
	username: string
): Promise<ResultSetHeader> => {
	console.log(`ID`, id, email, username);
	return QueryMetadata(
		'INSERT INTO banned_authors (id, email, username) VALUES (?,?,?);',
		[id, email, username]
	);
};

//DELETE a pattern
const destroy = (id: string): Promise<ResultSetHeader> =>
	QueryMetadata('DELETE FROM authors WHERE id = ?;', [id]);

export default { all, one, find, insert, ban, destroy };
