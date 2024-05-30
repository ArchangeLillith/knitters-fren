import baseService from "./base";
import storage from "../utils/storage";

const loginUser = async (payload: { [key: string]: string }) => {
	try {
    //Try to post the payload and if the response is good, the token is given back from the server and set in the users local storage
		const { token } = await baseService.post("/auth/login", payload);
		storage.setToken(token);
	} catch (error) {
		throw error;
	}
};

const registerUser = async (payload: { [key: string]: string }) => {
	try {
    //The payload is posted at the register url and if everything goes well, the server responds with a token which is then set in the users local storage
		const { token } = await baseService.post("/auth/register", payload);
		storage.setToken(token);
	} catch (error) {
		throw error;
	}
};

const validateToken = async () => {
	try {
    //Pings against the validtaion url and ensures that the user is who they say they are
		await baseService.get("/auth/validate/me");
	} catch (error) {
		throw error;
	}
};

export default {
	loginUser,
	registerUser,
	validateToken,
};
