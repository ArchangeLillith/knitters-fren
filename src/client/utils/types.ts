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
