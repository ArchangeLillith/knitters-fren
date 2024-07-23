import { objectType } from "../utils/types";
import baseService from "./base";

const findByTitle = async (searchString: string) => {
	try {
		const patterns = await baseService.get(`/api/search/title/${searchString}`);
		return patterns;
	} catch (error) {
		throw error;
	}
};

const findByTags = async (payload: objectType[]) => {
	try {
		const response = await baseService.post(`/api/search/tag`, {
			tagList: JSON.stringify(payload),
		});
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
};
