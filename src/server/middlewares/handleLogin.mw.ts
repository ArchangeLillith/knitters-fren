import passport from "passport";
import type { Request, Response, NextFunction } from "express";
import db from "../db";
import { AuthorsTable } from "../types";

export const handleLogin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate(
		"local",
		{ session: false },
		async (error: Error, user, info) => {
			if (error) {
				return next(error);
			}
			//commment

			if (info) {
				return res.status(401).json({ message: info.message });
			}
			try {
				const banned: AuthorsTable[] = await db.banned.findBannedById(user.id);
				console.log(`Banned`, banned);
				if (banned.length > 0)
					return res.status(403).json({
						message:
							"The email or username you provided is linked to a banned account. Please reach out to support for assistance.",
					});
			} catch (error) {
				next(error);
			}

			console.log(`New console log`)

			req.currentUser = user;
			console.log(`USER from missleware`, user);
			next();
		}
	)(req, res, next);
};
