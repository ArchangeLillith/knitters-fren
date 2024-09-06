export type objectType = { [key: string]: string };
export type Tags = Tag[];
export type Tag = { id: number; name: string };

export interface IPattern {
	id: string;
	author_id: string;
	title: string;
	content: string;
	created_at: string;
	tags?: string[];
}

export interface IUser {
	id?: string;
	username?: string;
	email?: string;
	patternsAuthored?: string[];
	patternsFavorited?: string[];
	commentsAuthored?: string[];
}

export enum ELocations {
	CreatePattern = "/patterns/new",
	FavoritePatterns = "/patterns/favorites",
}

export const locationStrings: Record<string, string> = {
	[ELocations.CreatePattern]: "new pattern ",
	[ELocations.FavoritePatterns]: "favorite patterns ",
};
