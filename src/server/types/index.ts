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
	email?: string;
	name?: string;
	created_at?: string;
	password?: string;
	role?: number;
}

export interface IPatternTags {
	name: string;
	id: number;
}
