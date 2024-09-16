import { Log, Pattern } from "./types";

//Zach
//Refactor the sortby into an enum and make the whole thing a switch rather than a bunch of ifs
export function sortByDate(arrayToSort: Pattern[] | Log[]): Pattern[] | Log[] {
	return arrayToSort.sort((a: Pattern | Log, b: Pattern | Log) => {
		if (a.created_at > b.created_at) {
			return -1; // a comes before b
		} else if (a.created_at < b.created_at) {
			return 1; // b comes before a
		} else {
			return 0; // a and b are equal
		}
	});

	// if (sortBy === "tag") {
	// }
	// if (sortBy === "text") {
	// }
}
