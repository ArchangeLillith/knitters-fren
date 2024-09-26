declare global {
	namespace Express {
		export interface Request {
			currentUser?: AuthorsTable;
			payload?: { id: string };
		}
	}
}

export interface PatternTable {
	id?: string;
	author_id?: string;
	title?: string;
	content?: string;
	created_at?: string;
	link?: string;
	paid?: 'true' | 'false';
}

export interface AuthorsTable {
	id?: string;
	username?: string;
	email?: string;
	password?: string;
	created_at?: string;
	role?: string;
}

//The type that's used in sql queries because the tags are aggregated so slapping a TagsTable on it doens't work
export interface PatternObjectQuery extends PatternTable, AuthorsTable {
	tags: Tag[];
	pattern: PatternTable;
}

export interface Tag {
	id: number;
	name: string;
}

export type Log = {
	id: number;
	user_id: string;
	action: string;
	details: string;
	created_at: string;
};

export type PatternComment = {
	id: number;
	author_id: string;
	pattern_id: string;
	content: string;
	created_at: string;
	username?: string;
};

export type FavoriteTable = {
	id: number;
	author_id: string;
	pattern_id: string;
};

export type PatternTag = {
	pattern_id: string;
	tag_id: number;
	id: number;
};

export type PatternObject = {
	pattern: PatternTable;
	tags: Tag[];
};
