import { Log, Pattern, PatternComment } from "./types";

//Zach
//Fix typings plsssss
//Refactor the sortby into an enum and make the whole thing a switch rather than a bunch of ifs
export function sortByDate(
	arrayToSort: Pattern[] | Log[] | PatternComment[]
): Pattern[] | Log[] | PatternComment[] {
	return arrayToSort.sort(
		(a: Pattern | Log | PatternComment, b: Pattern | Log | PatternComment) => {
			if (a.created_at > b.created_at) {
				return -1; // a comes before b
			} else if (a.created_at < b.created_at) {
				return 1; // b comes before a
			} else {
				return 0; // a and b are equal
			}
		}
	);

	// if (sortBy === "tag") {
	// }
	// if (sortBy === "text") {
	// }
}

export const loadingPattern = {
	id: "0",
	author_id: "Loading...",
	username: "",
	title: "Loading...",
	content: "Loading...",
	created_at: "Loading...",
};
