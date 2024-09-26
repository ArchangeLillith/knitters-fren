import baseService from './base';

/**
 *
 * Adds the tags to the pattern_tags joint table based on the id in the paramater object
 * @param payload - an object of the patternId and an array of patterns that need to be added to the pattern_tags joint table
 * @returns the pattern (I think)
 */
const addNewTags = async (payload: {
	pattern_id: string;
	tag_ids: number[];
}) => {
	if (payload.tag_ids.length < 0) return;

	try {
		console.log(`Adding tags to joint table....`);
		const response = await baseService.post(
			`/api/pattern_tags/${payload.pattern_id}`,
			{ tagList: JSON.stringify(payload) }
		);
		return response.pattern;
	} catch (error) {
		console.error(
			`Tags no added correctly, catch in addNewTasgs, error is:`,
			error
		);
		throw error;
	}
};

/**
 * Removes all tag association from pattern_tags table based on the patternId
 * @param id - id of pattern we want to remove patterns from
 */
const destroyAllTagsBasedOnId = async (id: string) => {
	await baseService.destroy(`/api/pattern_tags/delete/${id}`);
};

export default {
	addNewTags,
	destroyAllTagsBasedOnId,
};
