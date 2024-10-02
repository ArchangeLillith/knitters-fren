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

			if (info && info.message === 'No auth token') {
				req.currentUser = null;
			} else if (!user) {
				console.log(`info and message`, info, info.message);
				return res.status(401).json({ message: info.message });
			} else {
				req.currentUser = user;
			}

			next();
		}
	)(req, res, next);
};
