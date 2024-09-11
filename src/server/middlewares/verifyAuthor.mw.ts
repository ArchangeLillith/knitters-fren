import type { Request, Response, NextFunction } from "express";
import db from "../db";

export const verifyAuthor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const patternId = req.params.id;
		const currentUserId = req.currentUser.id;
		const pattern = await db.patterns.oneById(patternId);

		if (!pattern) {
			return res.status(404).json({ message: "Pattern not found" });
		}

		//If the user is the author, this return will skip the next middle ware and return into the route to delete the pattern
		if (pattern.author_id === currentUserId) {
			return next();
		}

		//If the user isn't the author, this then chains to the next middleware because there's no return keyword
		next();
	} catch (error) {
		next(error);
	}
};
