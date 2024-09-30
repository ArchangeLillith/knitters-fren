import { Log, PatternComment, PatternObject } from './types';

//Zach
//Refactor the sortby into an enum and make the whole thing a switch rather than a bunch of ifs
export function sortByDate(
	arrayToSort: PatternObject[] | Log[] | PatternComment[]
): PatternObject[] | Log[] | PatternComment[] {
	// Type guard to check if an array contains PatternObject items
	function isPatternObjectArray(array: unknown): array is PatternObject[] {
		return (
			Array.isArray(array) &&
			array.every(item => {
				// Here, add checks to verify the properties of PatternObject
				return (
					typeof item === 'object' &&
					item !== null &&
					'pattern' in item &&
					'tags' in item
				);
			})
		);
	}
	if (isPatternObjectArray(arrayToSort)) {
		return arrayToSort.sort((a: PatternObject, b: PatternObject) => {
			if (a.pattern.created_at > b.pattern.created_at) {
				return -1; // a comes before b
			} else if (a.pattern.created_at < b.pattern.created_at) {
				return 1; // b comes before a
			} else {
				return 0; // a and b are equal
			}
		});
	}
	return arrayToSort.sort(
		(a: Log | PatternComment, b: Log | PatternComment) => {
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
	pattern: {
		id: '0',
		author_id: 'Loading...',
		username: '',
		title: 'Loading...',
		content: 'Loading...',
		created_at: 'Loading...',
	},
	tags: [],
};
