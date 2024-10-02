import jwt from 'jsonwebtoken';

import config from '../config';

export const createJWT = (id: string, role: string) => {
	const token = jwt.sign({ id, role }, config.jwt.secret, {
		expiresIn: config.jwt.expires,
	});
	return token;
};
