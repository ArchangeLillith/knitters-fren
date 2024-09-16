export type objectType = { [key: string]: string | boolean };

/**
 * Pattern type declaration
 */
export type Pattern = {
	id: string;
	link?: string;
	author_id: string;
	title: string;
	content: string;
	created_at: string;
	tags?: string[];
	paid?: "true" | "false";
};

export type Tags = Tag[];

export type Tag = {
	name: string;
	id: number;
};

export type AdminState = {
	patterns: Pattern[];
	tags: Tag[];
	logs: Log[];
	filteredLogs: Log[];
	authors: Author[];
	showModal: boolean;
	banAuthor: { id: string; username: string };
};

/**
 *Author type declaration
 */
export type Author = {
	id?: string;
	username?: string;
	email?: string;
	patternsAuthored?: string[];
	patternsFavorited?: string[];
	commentsAuthored?: string[];
	role?: "user" | "admin";
};

/**
 * Tying the url to a name
 */
export enum ELocations {
	CreatePattern = "/patterns/new",
	FavoritePatterns = "/patterns/favorites",
}

/**
 * Using that location and tying it to a string value based on url
 */
export const locationStrings: Record<string, string> = {
	[ELocations.CreatePattern]: "new pattern ",
	[ELocations.FavoritePatterns]: "favorite patterns ",
};

/**
 * The type for logs coming in from that backend
 */
export type Log = {
	id: number;
	user_id: string;
	action: string;
	details: string;
	created_at: string;
};
