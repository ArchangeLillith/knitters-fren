import baseService from "./base";

const getAllPatterns = async () => {
	try {
		const patterns = await baseService.get("/api/patterns");
		return patterns;
	} catch (error) {
		throw error;
	}
};

//Fix this type
const getOnePattern = async (id: string) => {
	try {
		const Pattern = await baseService.get(`/api/patterns/${id}`);
		return Pattern;
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

//Fix this type
const destroyPattern = async (id: any) => {
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
	getAllPatterns,
	getOnePattern,
	addNewPattern,
	destroyPattern,
	updatePattern,
};
