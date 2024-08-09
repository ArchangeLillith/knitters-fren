import { objectType } from "../utils/types";
import baseService from "./base";

/**
 * @param searchString - the query string
 * Searches the database to find any title matches the query string
 * @returns an array of patterns that have the query in the title
 */
const findByTitle = async (searchString: string) => {
	console.log(`Search string`, searchString);
	try {
		const response = await baseService.get(`/api/search/title/${searchString}`);
		console.log(`response`, response);
		if (response === undefined) {
			return undefined;
		}
		return response.result;
	} catch (error) {
		console.error("Error fetching patterns:", error);
		throw error;
	}
};

/**
 * @param searchString - the query string
 * Searches the database to find any pattern that has a content that includes the search string
 * @returns an array of patterns that have the search string in the content section
 */
const findByContent = async (searchString: string) => {
	console.log(`Search string`, searchString);
	try {
		const response = await baseService.get(
			`/api/search/content/${searchString}`
		);
		console.log(`response`, response);
		if (response === undefined) {
			return undefined;
		}
		return response.result;
	} catch (error) {
		console.error("Error fetching patterns:", error);
		throw error;
	}
};

/**
 * @param payload - an array of strings that are the names of tags to search by
 * Searches the database to find any pattern that includes AT LEAST ONE of the tags
 * @returns an array of patterns that have at least one of the tags
 */
const findByTags = async (payload: objectType[]) => {
	try {
		const response = await baseService.post(`/api/search/tag`, {
			tagList: JSON.stringify(payload),
		});
		console.log(`response`, response);
		if (response.finalPatterns.length === 0) {
			return response.status(204).json({ message: "No patterns found" });
		}
		return response;
	} catch (error) {
		throw error;
	}
};

/**
 * @param payload - an array of strings that are the names of tags to search by
 * Searches the database to find any pattern that EXACTLY matches ALL the tags selected
 * @returns an array of patterns that has all the tags in the payload
 */
const findByTagsStrict = async (payload: objectType[]) => {
	try {
		const response = await baseService.post(`/api/search/tag/strict`, {
			tagList: JSON.stringify(payload),
		});
		console.log(`response`, response);
		if (response.finalPatterns.length === 0) {
			return response.status(204).json({ message: "No patterns found" });
		}
		return response;
	} catch (error) {
		throw error;
	}
};


/**
 * @param payload - the object that has all the data required to write a new pattern
 * Writes a new pattern to the database
 * @returns the new pattern id
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
 * @param id - the id of the pattern that is going to be destroyed
 * Removes a pattern from the database completely
 */
const destroyPattern = async (id: number) => {
	try {
		await baseService.destroy(`/api/patterns/${id}`);
	} catch (error) {
		throw error;
	}
};

/**
 * @param id - the id of the pattern that's being updated
 * @param payload - the new values that are being assigned to the pattern
 * Updates a pattern with new values in any field, keeping the same id for that pattern
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
	findByTitle,
	findByTags,
	addNewPattern,
	destroyPattern,
	updatePattern,
	findByContent,
	findByTagsStrict,
};
