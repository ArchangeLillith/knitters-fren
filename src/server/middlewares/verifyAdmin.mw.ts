import type { Request, Response, NextFunction } from 'express';
import passport from 'passport';
export const verifyAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.skipAdminMiddleware) {
		console.log(`Skipping admin middlewre`);
		return next();
	}
	passport.authenticate(
		'jwt',
		{ session: false },
		(error: Error, user, info) => {
			if (error) {
				return next(error);
			}

			if (info) {
				return res.status(401).json({ message: info.message });
			}

			req.currentUser = user;
			if (user.role !== 'admin') {
				return res.status(403).json({ message: 'Insufficient permissions' });
			}
			next();
		}
	)(req, res, next);
};
