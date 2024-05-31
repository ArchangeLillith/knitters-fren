export type objectType = { [key: string]: string };

export interface IPattern {
	id: string;
	author_id: string;
	title: string;
	content: string;
	created_at: string;
	tags?: string[];
}

export const dummyPattern = {
	id: "4",
	author_id: "8",
	title: "This is a dummy title",
	content:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	created_at: "2024-05-28 20:27:45",
};
