import baseService from "./base";
import storage from "../utils/storage";
import { IUser } from "../utils/types";
import { jwtDecode } from "jwt-decode";

const loginUser = async (payload: { [key: string]: string }) => {
	try {
		//Try to post the payload and if the response is good, the token is given back from the server and set in the users local storage
		const { token } = await baseService.post("/auth/login", payload);
		console.log(`TOKEN IN STORAGE`, token);
		storage.setToken(token);
		return token;
	} catch (error) {
		throw error;
	}
};

const registerUser = async (payload: { [key: string]: string }) => {
	try {
		//The payload is posted at the register url and if everything goes well, the server responds with a token which is then set in the users local storage
		const token = await baseService.post("/auth/register/", payload);
		storage.setToken(token);
		return token;
	} catch (error) {
		console.log(`ERROR`, error);
		throw error;
	}
};

const validateToken = async (token: string): Promise<IUser> => {
	try {
		console.log(`validate token`);
		//Pings against the validation url and ensures that the user is who they say they are
		const validated = await baseService.get("/auth/validate/me");
		console.log(`validated`, validated);
		//Return if not validated
		if (validated.message !== "success") {
			console.log(`validated false`);
			throw new Error(
				"token bad, something went wrong with frontend check of token"
			);
		}
		//Decode to grab ID
		const decoded: any = jwtDecode(token);
		const userId: string = decoded.id;
		//Grab author from db
		const user: IUser = await baseService.get(`/api/authors/${userId}`);
		console.log(`USER`, user);
		//Cry if user isn't fetched
		if (!user) throw new Error("user couldn't be fetched TT_TT");
		//Otherwise return the user (tags still attached)
		return user;
	} catch (error) {
		console.log(`ERROR in alidateToken`, error);
		throw error;
	}
};

export default {
	loginUser,
	registerUser,
	validateToken,
};
