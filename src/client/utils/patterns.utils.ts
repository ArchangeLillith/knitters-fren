import { IPattern } from "./types";

//Refactor the sortby into an enum and make the whole thing a switch rather than a bunch of ifs
export function sortPatterns(patterns: IPattern[], sortBy: string): IPattern[] {
	if (sortBy === "date") {
		return patterns.sort((a: IPattern, b: IPattern) => {
			if (a.created_at > b.created_at) {
				return -1;
			} else return 1;
		});
	}
	if (sortBy === "tag") {
	}
	if (sortBy === "text") {
	}
}
