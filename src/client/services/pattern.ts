import baseService from "./base";

/**
 * Calls to backend and returns all patterns from database
 * @returns an array of patterns
 */
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
 * @param id - the patternId to destroy
 * Destorys the pattern based on id, backend also handles the joint table deletion so this is a one stop shop to delete the pattern fully
 */
const destroyPattern = async (id: string) => {
	try {
		await baseService.destroy(`/api/patterns/${id}`);
	} catch (error) {
		throw error;
	}
};

/**
 * @param id - the pattern that's being updated
 * @param payload - the new data to be written to the pattern
 * Updates data on the pattern based on id, but doesn't change the pattern id
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
