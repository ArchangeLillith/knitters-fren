import baseService from './base';

const getAllAuthors = async () => {
	const authors = await baseService.get(`/api/authors`);
	return authors;
};

const getUsernameById = async (id: string) => {
	const username = await baseService.get(`/api/authors/${id}`);
	return username;
};

const banAuthor = async (authorId: string) => {
	const payload = { authorId };
	const response = await baseService.post(`/api/authors/ban`, payload);
	return response;
};
export default {
	getAllAuthors,
	getUsernameById,
	banAuthor,
};
