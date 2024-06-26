declare global {
	namespace Express {
		export interface Request {
			currentUser?: IAuthorsTable;
			payload?: { id: string };
		}
	}
}

export interface IPatternTable {
	id?: string;
	author_id?: string;
	title?: string;
	content?: string;
	created_at?: string;
}
export interface IAuthorsTable {
	id?: string;
	email?: string;
	name?: string;
	created_at?: string;
	password?: string;
}
