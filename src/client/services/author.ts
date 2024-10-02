import baseService from './base';

const banAuthor = async (authorId: string) => {
	const payload = { authorId };
	const response = await baseService.post(`/api/authors/ban`, payload);
	return response;
};

export default {
	banAuthor,
};
