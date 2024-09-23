import baseService from './base';

const getAllTags = async () => {
	const tags = await baseService.get(`/api/tags`);
	return tags;
};

export default {
	getAllTags,
};
