import baseService from "./base";

/**
 * @param id - the id of the pattern we want the tags for
 * Gets all the tags for the pattern id passed in
 * @returns an array(?) of tags
 */
const allByPatternId = async (id: number) => {
	try {
		const patterns = await baseService.get(`/api/pattern_tags/${id}`);
		return patterns;
	} catch (error) {
		throw error;
	}
};

/**
 * @param payload - an object with the patternId and the tagIds to add to the joint table
 * Adds the tags to the joint table associated with the patternId that's passed in as well
 * @returns the pattern
 */
const addNewTags = async (payload: {
	pattern_id: number;
	tag_ids: number[];
}) => {
	try {
		console.log(`Adding tags to joint table....`);
		const response = await baseService.post(
			`/api/pattern_tags/${payload.pattern_id}`,
			{ tagList: JSON.stringify(payload) }
		);
		return response.pattern;
	} catch (error) {
		throw error;
	}
};

/**
 * @param id - id of pattern we want to remove patterns from
 * Removes all tag association from pattern_tags table based on the patternId
 */
const destroyAllTagsBasedOnId = async (id: any) => {
	try {
		await baseService.destroy(`/api/pattern_tags/delete/${id}`);
	} catch (error) {
		throw error;
	}
};

export default {
	allByPatternId,
	addNewTags,
	destroyAllTagsBasedOnId,
};
