import { FormFields } from "./types";

export function isValidEmail(email: string) {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
}

export const validateFields = (
	{ email, password, confirmPassword, username }: FormFields
) => {
	const errors: string[] = [];
	if (!isValidEmail(email)) errors.push("invalid email");
	if (password !== confirmPassword) errors.push("passwords don't match");
	if (!password || !username || !email)
		errors.push("all fields are required");
	return errors;
};