import { Dispatch, SetStateAction } from 'react';

export type objectType = { [key: string]: string | boolean };

declare module 'react-router-dom' {
	interface Location {
		state: {
			from: any;
			id: string;
			name: string;
		};
	}
}

export type FetchDataResponse = {
	tags: Tag[];
	patterns: PatternObject[];
	logs: Log[];
	authors: Author[];
	comments: PatternComment[];
};
/**
 * Pattern type declaration
 */
export type Pattern = {
	id: string;
	link?: string;
	author_id: string;
	username: string;
	title: string;
	content: string;
	created_at: string;
	tags?: Tag[];
	paid: 'true' | 'false';
};

export type Tag = {
	name: string;
	id: number;
};

export type AdminPageState = {
	patterns: PatternObject[];
	tags: Tag[];
	logs: Log[];
	filteredLogs: Log[];
	authors: Author[];
	comments: PatternComment[];
	filteredComments: PatternComment[];
	showModal: boolean;
};

export type AdminPageProps = {
	state: AdminPageState;
	setState: Dispatch<SetStateAction<AdminPageState>>;
};

export type PatternModificationState = {
	title: string;
	paid: 'true' | 'false';
	content: string;
	link: string | undefined;
	selectedTags: Tag[];
	tagsActive: boolean;
};

export type SetSelectedTags =
	| React.Dispatch<React.SetStateAction<SearchPageState>>
	| React.Dispatch<React.SetStateAction<PatternModificationState>>
	| React.Dispatch<
			React.SetStateAction<{ tagsActive: boolean; selectedTags: Tag[] }>
	  >;
export type AddPatternPageProps = {
	state: PatternModificationState;
	setState: React.Dispatch<React.SetStateAction<PatternModificationState>>;
};

/**
 *Author type declaration
 */
export type Author = {
	id: string;
	username: string;
	email: string;
	patternsAuthored: string[];
	patternsFavorited: string[];
	commentsAuthored: number[];
	role: 'user' | 'admin';
};

export type AuthState = {
	authenticated: boolean;
	authorData: Author | null;
};

/**
 * Tying the url to a name
 */
export enum ELocations {
	// eslint-disable-next-line no-unused-vars
	CreatePattern = '/patterns/new',
	// eslint-disable-next-line no-unused-vars
	FavoritePatterns = '/patterns/favorites',
}

/**
 * Using that location and tying it to a string value based on url
 */
export const locationStrings: Record<string, string> = {
	[ELocations.CreatePattern]: 'new pattern ',
	[ELocations.FavoritePatterns]: 'favorite patterns ',
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

export type PatternComment = {
	id: number;
	author_id: string;
	pattern_id: string;
	content: string;
	created_at: string;
	username?: string;
};

//Type for Search page
export type SearchPageState = {
	selectedTags: Tag[];
	tagsActive: boolean;
	searchType: string;
	queryString: string;
	strictComparison: boolean;
	searchTriggered: boolean;
	foundPatterns: PatternObject[];
};

export type PatternObject = {
	id: string;
	link?: string;
	author_id: string;
	username: string;
	title: string;
	content: string;
	created_at: string;
	paid: 'true' | 'false';
	tags: Tag[];
};

export type FormFields = {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
};

export type NewPattern = {
	id: string;
	title: string;
	content: string;
	author_id: string;
	link: string;
	paid: 'true' | 'false';
};
export interface PatternProps {
	allPatterns: PatternObject[];
	featured: PatternObject;
	mostRecent: PatternObject[];
}
export type SearchFunction = (searchString: string) => Promise<PatternObject[]>;

export const loadingPattern: PatternObject = {
	id: '0',
	author_id: 'Loading...',
	username: '',
	title: 'Loading...',
	content: 'Loading...',
	created_at: 'Loading...',
	tags: [],
};

export const undefinedUser: Author = {
	id: '',
	username: '',
	email: '',
	patternsAuthored: [],
	patternsFavorited: [],
	commentsAuthored: [],
	role: 'user',
};
