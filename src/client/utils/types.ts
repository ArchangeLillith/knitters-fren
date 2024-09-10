export type objectType = { [key: string]: string };
export type Tags = Tag[];
export type Tag = { id: number; name: string };

/**
 * Pattern type declaration
 */
export interface IPattern {
	id: string;
	author_id: string;
	title: string;
	content: string;
	created_at: string;
	tags?: string[];
}

/**
 *Author type declaration
 */
export interface IAuthor {
	id?: string;
	username?: string;
	email?: string;
	patternsAuthored?: string[];
	patternsFavorited?: string[];
	commentsAuthored?: string[];
	role?: "user" | "admin";
}

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
