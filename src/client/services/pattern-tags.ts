import baseService from "./base";

const allByPatternId = async (id: number) => {
	try {
		const patterns = await baseService.get(`/api/pattern_tags/${id}`);
		return patterns;
	} catch (error) {
		throw error;
	}
};

const getOneTag = async (id: string) => {
	try {
		const Pattern = await baseService.get(`/api/patterns/${id}`);
		return Pattern;
	} catch (error) {
		throw error;
	}
};

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

//Fix this type
const destroyAllTagsBasedOnId = async (id: any) => {
	try {
		await baseService.destroy(`/api/pattern_tags/${id}`);
	} catch (error) {
		throw error;
	}
};

const updateTag = async (
	id: string,
	payload: { content: string; author_id: string }
) => {
	try {
		await baseService.put(`/api/pattern_tags/${id}`, payload);
	} catch (error) {}
};

export default {
	allByPatternId,
	getOneTag,
	addNewTags,
	destroyAllTagsBasedOnId,
	updateTag,
};
