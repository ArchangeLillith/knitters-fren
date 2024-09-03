import jwt from "jsonwebtoken";
import config from "../config";

//We default this to 1 unless soemthing else is passed in. 1 means just a regular user, 9 is admin
export const createJWT = (userId: string, email: string, role: number) => {
	try {
		const token = jwt.sign({ userId, email, role }, config.jwt.secret, {
			expiresIn: config.jwt.expires,
		});
		return token;
	} catch (error) {
		throw error;
	}
};
