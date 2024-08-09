import baseService from "./base";

const getAllPatterns = async () => {
	try {
		const patterns = await baseService.get("/api/patterns");
		return patterns;
	} catch (error) {
		throw error;
	}
};

/**
 *
 * @param id - the id of the requested pattern
 * Calls to the backend to grab the pattern based on the id passed in
 * @returns the pattern requested
 */
const getOnePattern = async (id: string) => {
	try {
		const Pattern = await baseService.get(`/api/patterns/${id}`);
		return Pattern;
	} catch (error) {
		throw error;
	}
};

/**
 *
 * @param payload - an object with the required parameters to write a pattern into the database
 * Calls to the backend and writes a new pattern to the database
 * @returns the patternId of the newly written pattern
 */
const addNewPattern = async (payload: {
	title: string;
	content: string;
	author_id: string;
}) => {
	try {
		console.log(`Adding pattern....`);
		const response = await baseService.post("/api/patterns", payload);
		return response.pattern;
	} catch (error) {
		throw error;
	}
};

/**
 *
 * @param id - the id of the pattern that is to be deleted
 * Calls to the backend and deletes the pattern after removing all the entries in pattern_tags
 */
const destroyPattern = async (id: number) => {
	try {
		await baseService.destroy(`/api/patterns/${id}`);
	} catch (error) {
		throw error;
	}
};

/**
 *
 * @param id - the patternId of the pattern being updated
 * @param payload - the new data to be written to the patternId passed in
 * Writes the new data to the id passed in to update the pattern
 */
const updatePattern = async (
	id: string,
	payload: { content: string; author_id: string }
) => {
	try {
		await baseService.put(`/api/patterns/${id}`, payload);
	} catch (error) {}
};

export default {
	getAllPatterns,
	getOnePattern,
	addNewPattern,
	destroyPattern,
	updatePattern,
};
