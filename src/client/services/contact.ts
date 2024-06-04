import baseService from "./base";

const sendEmail = async (payload: {
	from: string;
	subject: string;
	message: string;
}) => {
	try {
		const response = await baseService.post("/api/contact", payload);
		return response.json();
	} catch (error) {
		throw error;
	}
};

export default {
	sendEmail: sendEmail,
};
