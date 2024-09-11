declare global {
	namespace Express {
		export interface Request {
			currentUser?: IAuthorsTable;
			payload?: { id: string };
		}
	}
}
export type Tags = Tag[];
export type Tag = { id: number; name: string };

export interface IPatternTable {
	id?: string;
	author_id?: string;
	title?: string;
	content?: string;
	created_at?: string;
}

export interface IAuthorsTable {
	id?: string;
	username?: string;
	email?: string;
	password?: string;
	created_at?: string;
	role?: string;
}

export interface IPatternTags {
	name: string;
	id: number;
}

export type Log = {
	id: number;
	user_id: string;
	action: string;
	details: string;
	created_at: string;
};
