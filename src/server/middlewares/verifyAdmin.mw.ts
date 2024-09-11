import passport from "passport";
import type { Request, Response, NextFunction } from "express";

export const verifyAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate(
		"local",
		{ session: false },
		(error: Error, user, info) => {
			if (error) {
				return next(error);
			}

			if (info) {
				return res.status(401).json({ message: info.message });
			}

			req.currentUser = user;
			if (user.role !== "admin") {
				return res.status(403).json({ message: "Insufficient permissions" });
			}
			next();
		}
	)(req, res, next);
};
