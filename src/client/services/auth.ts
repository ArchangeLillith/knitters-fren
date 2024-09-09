import baseService from "./base";
import storage from "../utils/storage";
import { IAuthor } from "../utils/types";
import { jwtDecode } from "jwt-decode";

/**
 * Called from login component, this calls to our api and attempts to return a token which then is set to the local storage
 * @param payload - The sanitized values from the frontend that are being compared to the data in the database
 * @returns A JWT if the login succeeded, or an error if not
 */
const loginUser = async (payload: { username: string; password: string }) => {
	try {
		const { token } = await baseService.post("/auth/login", payload);
		console.log(`TOKEN IN STORAGE`, token);
		storage.setToken(token);
		return token;
	} catch (error) {
		throw error;
	}
};

/**
 *Registers the user by posting against the database with the sanitized payload from the component
 * @param payload - The input from the user coming from the component
 * @returns A JWT or error
 */
const registerUser = async (payload: {
	email: string;
	password: string;
	username: string;
}) => {
	try {
		const token = await baseService.post("/auth/register/", payload);
		storage.setToken(token);
		return token;
	} catch (error) {
		console.log(`ERROR`, error);
		throw error;
	}
};

/**
 *Validates the JWT, decodes out the id and grabs the user from the database based on that ID
 * @param token - The JWT
 * @returns the user
 */
const getUserFromToken = async (token: string): Promise<IAuthor> => {
	try {
		const validated = await baseService.get("/auth/validate/me");
		if (validated.message !== "success") {
			throw new Error(
				"token bad, something went wrong with frontend check of token"
			);
		}
		const decoded: any = jwtDecode(token);
		const userId: string = decoded.id;
		const user: IAuthor = await baseService.get(`/api/authors/${userId}`);
		console.log(`USER`, user);
		if (!user) throw new Error("user couldn't be fetched TT_TT");
		return user;
	} catch (error) {
		console.log(`ERROR in get?UserFromToen`, error);
		throw error;
	}
};

export default {
	loginUser,
	registerUser,
	getUserFromToken,
};
