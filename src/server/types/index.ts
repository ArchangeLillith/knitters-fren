import type { UsersTable } from "../db/queries/authors";

declare global {
	namespace Express {
		export interface Request {
			currentUser?: UsersTable;
			payload?: { id: string };
		}
	}
}
