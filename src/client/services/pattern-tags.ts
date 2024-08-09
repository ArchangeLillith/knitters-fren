import baseService from "./base";

/**
 *
 * @param id - the number of the patternId
 * Fetches all the tags associated with the id passed in and returns them
 * @returns the tags associated with the patternId passed in
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
 * 
 * @param payload - an object of the patternId and an array of patterns that need to be added to the pattern_tags joint table
 * Adds the tags to the pattern_tags joint table based on the id in the paramater object
 * @returns the pattern (I think)
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


export default {
	allByPatternId,
	addNewTags
};
