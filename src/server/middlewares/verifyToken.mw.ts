import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate(
		'jwt',
		{ session: false },
		(error: Error, user, info) => {
			console.log(`Check token`);
			if (error) {
				return next(error);
			}

			if (info) {
				return res.status(401).json({ message: info.message });
			}

			req.currentUser = user;
			next();
		}
	)(req, res, next);
};
