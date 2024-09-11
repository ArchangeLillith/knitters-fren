import { objectType } from "../utils/types";
import baseService from "./base";

/**
 * Searches the databse for ANY title that matches the searchString
 * @param searchString - the string to search by
 * @returns an array of patterns that match the search or an empty array
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
 * Searches the database to find any pattern that has a content that includes the search string
 * @param searchString - the query string
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
 * Searches the database to find any pattern that includes AT LEAST ONE of the tags
 * @param payload - an array of objects of type {id: number(?), name: string}
 * @returns
 */
const findByTags = async (payload: objectType[]) => {
	try {
		const response = await baseService.post(`/api/search/tag`, {
			tagList: JSON.stringify(payload),
		});
		console.log(`response`, response);
		if (response.finalPatterns.length === 0) {
			throw new Error("No patterns found");
		}
		return response;
	} catch (error) {
		throw error;
	}
};

/**
 * Searches the database to find any pattern that EXACTLY matches ALL the tags selected
 * @param payload - an array of strings that are the names of tags to search by
 * @returns an array of patterns that has all the tags in the payload
 */
const findByTagsStrict = async (payload: objectType[]) => {
	try {
		const response = await baseService.post(`/api/search/tag/strict`, {
			tagList: JSON.stringify(payload),
		});
		console.log(`response`, response);
		if (response.finalPatterns.length === 0 || response === 404) {
			return response.status(204).json({ message: "No patterns found" });
		}
		return response;
	} catch (error) {
		throw error;
	}
};

export default {
	findByTitle,
	findByTags,
	findByContent,
	findByTagsStrict,
};
