import { objectType } from "../utils/types";
import baseService from "./base";

/**
 * @param searchString - the string to search by
 * Searches the databse for ANY title that matches the searchString
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
 * @param searchString - the string to search by
 * Searches the databse for a pattern that's content includes the searchString
 * @returns an array of patterns that match the search or an empty array
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
 * @param payload - an array of objects of type {id: number(?), name: string}
 * Finds patterns by tags and returns the patterns that match 
 * @returns 
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

const destroyPattern = async (id: number) => {
	try {
		await baseService.destroy(`/api/patterns/${id}`);
	} catch (error) {
		throw error;
	}
};

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
};
