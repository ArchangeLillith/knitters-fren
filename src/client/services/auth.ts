import { jwtDecode } from 'jwt-decode';

import baseService from './base';
import storage from '../utils/storage';
import { Author } from '../utils/types';

/**
 * Called from login component, this calls to our api and attempts to return a token which then is set to the local storage
 * @param payload - The sanitized values from the frontend that are being compared to the data in the database
 * @returns A JWT if the login succeeded, or an error if not
 */
const authenticateUserAndStoreToken = async (payload: {
	username: string;
	password: string;
}) => {
	const token = await baseService.post('/auth/login', payload);
	if (!token) return;

	storage.setToken(token);
	return token;
};

/**
 *Registers the user by posting against the database with the sanitized payload from the component
 * @param payload - The input from the user coming from the component
 * @returns A JWT or error
 */
const registerUserAndStoreToken = async (payload: {
	email: string;
	password: string;
	username: string;
}) => {
	console.log(`REGISTER AND STORE TOKEN`);
	const token = await baseService.post('/auth/register/', payload);
	if (!token) return;
	console.log(`TOKEN`, token);
	storage.setToken(token);
	return token;
};

/**
 *Validates the JWT, decodes out the id and grabs the user from the database based on that ID
 * @param token - The JWT
 * @returns the user
 */
const getUserFromToken = async (token: string): Promise<Author> => {
	try {
		const validated = await baseService.get('/auth/validate/me');
		if (validated?.message !== 'success') {
			throw new Error(
				'token bad, something went wrong with frontend check of token'
			);
		}
		const decoded: any = jwtDecode(token);
		const userId: string = decoded.id;
		const user: Author = await baseService.get(`/api/authors/${userId}`);
		if (!user) throw new Error("user couldn't be fetched TT_TT");
		return user;
	} catch (error) {
		console.log(`ERROR in get?UserFromToen`, error);
		throw error;
	}
};

export default {
	authenticateUserAndStoreToken,
	registerUserAndStoreToken,
	getUserFromToken,
};
