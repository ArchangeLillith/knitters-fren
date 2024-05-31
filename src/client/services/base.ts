import storage from "../utils/storage";
import { objectType } from "../utils/types";

const makeFetch = (url: string, info: any) => {
	return fetch("http://localhost:3000" + url, info);
};

//Method here is PUT, POST, GET not like a class method
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
		//If the response is ok that's a 200's code I think
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

const get = (url: string) => {
	return json(url, "GET");
};
const post = (url: string, payload: { [key: string]: string }) => {
	return json(url, "POST", payload);
};
const put = (url: string, payload: { [key: string]: string }) => {
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
