import baseService from "./base";

/**
 * Gets all the tags for the pattern id passed in
 * @param id - the id of the pattern we want the tags for
 * @returns an array(?) of tags
 */
const getAllTags = async () => {
	try {
		const tags = await baseService.get(`/api/pattern_tags/`);
		return tags;
	} catch (error) {
		throw error;
	}
};

/**
 * Gets all the tags for the pattern id passed in
 * @param id - the id of the pattern we want the tags for
 * @returns an array(?) of tags
 */
const allByPatternId = async (id: string) => {
	try {
		const tags = await baseService.get(`/api/pattern_tags/${id}`);
		return tags;
	} catch (error) {
		throw error;
	}
};

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
const destroyAllTagsBasedOnId = async (id: any) => {
	try {
		await baseService.destroy(`/api/pattern_tags/delete/${id}`);
	} catch (error) {
		throw error;
	}
};

export default {
	getAllTags,
	allByPatternId,
	addNewTags,
	destroyAllTagsBasedOnId,
};
