import storage from "../utils/storage";
import { objectType } from "../utils/types";

//This screws your prod, make sure you have the prod info here lol
const makeFetch = (url: string, info: any) => {
	return fetch(process.env.ROOT_URL + url, info);
};

/**
 *
 * @param url - the target backend url for this request
 * @param method - get/put/post/delete as a string
 * @param body - the request body, deleted here if there is one and it's a GET
 * The base of our routing from the frontend, handles all the requests to the backend.
 * @returns whatever we expect from the backend or an error if something went wrong
 */
const json = async (url: string, method: string, body: objectType = {}) => {
	const TOKEN = storage.getToken();
	const headers = {
		"Content-Type": "application/json",
	};


	//If there's a token in storage, then we add it here to show that the user is either authorized by the token or is spoofing the token which will casue an error on the backend if so.
	if (TOKEN) {
		headers["Authorization"] = `Bearer ${TOKEN}`;
	}

	const data: {
		method: string;
		headers: objectType;
		body?: any;
	} = {
		method,
		headers,
		body: JSON.stringify(body),
	};

	//Stripping the request if the method is a get because these things aren't needed in a get method call
	if (method === "GET") {
		// delete headers["Content-Type"];
		delete data.body;
	}

	try {
		const fetchResponse = await makeFetch(url, data);
		const response = await fetchResponse.json();
		//If the response is ok that's a 200's code (90% sure)
		if (fetchResponse.ok) {
			return response;
		} else {
			//Otherwise, if the cose isn't in the 200s, the response.ok is false
			response.error || response.message || "Something went wrong";
		}
	} catch (error) {
		throw error;
	}
};
/**
 * Catchers for the different types of requests, formatting the data and passing into out base json function what it needs to understand what type of request we want.
 * @param url - the target backend url for the request
 * @returns whatever we expect from the backend or an error if one was thrown
 */
const get = (url: string) => {
	return json(url, "GET");
};
const post = (url: string, payload: objectType) => {
	console.log(`PAYLOAD`, payload);
	return json(url, "POST", payload);
};
const put = (url: string, payload: objectType) => {
	return json(url, "PUT", payload);
};
const destroy = (url: string) => {
	return json(url, "DELETE");
};

export default {
	get,
	post,
	put,
	destroy,
};
