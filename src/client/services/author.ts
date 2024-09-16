import baseService from "./base";

const getAllAuthors = async () => {
	try {
		const authors = await baseService.get(`/api/authors`);
		return authors;
	} catch (error) {
		throw error;
	}
};

const getUsernameById = async (id: string) => {
	try {
		const username = await baseService.get(`/api/authors/${id}`);
		console.log(`USER`, username);
		return username;
	} catch (error) {
		throw error;
	}
};

const banAuthor = async (authorId: string) => {
	try {
		const payload = { authorId };
		const response = await baseService.post(`/api/authors/ban`, payload);
		return response;
	} catch (error) {
		throw error;
	}
};
export default {
	getAllAuthors,
	getUsernameById,
	banAuthor,
};
