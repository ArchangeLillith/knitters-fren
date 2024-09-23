import type { AuthorsTable } from "../../types";
import { Query } from "../query";

const findBannedById = (id: string): Promise<AuthorsTable[]> =>
	Query<AuthorsTable[]>(`SELECT * FROM banned_authors WHERE id = ?;`, [id]);

const findBannedByEmailOrUser = (
	email: string,
	username: string
): Promise<AuthorsTable[]> =>
	Query<AuthorsTable[]>(
		`SELECT * FROM banned_authors WHERE username = ? OR email = ? ;`,
		[username, email]
	);

export default { findBannedById, findBannedByEmailOrUser };