import { Router } from "express";
import db from "../../db";
import type { AuthorsTable } from "../../types";
import { logActivity } from "../../utils/logging";
import { verifyToken } from "../../middlewares/verifyToken.mw";
import { verifyAdmin } from "../../middlewares/verifyAdmin.mw";

const router = Router();

//GET /api/authors
router.get("/", async (req, res, next) => {
	try {
		const result = await db.authors.all();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

//GET /api/authors/ban
router.post("/ban", verifyToken, verifyAdmin, async (req, res, next) => {
	try {
		const { authorId } = req.body;

		const author: AuthorsTable = await db.authors.one(authorId);
		if (!author) {
			return next(new Error("Author not found when trying to ban"));
		}

		const patterns = await db.patterns.allByAuthor(authorId);
		if (patterns.length > 0) {
			await Promise.all(
				patterns.map((pattern) => db.patterns.updateAuthorToBanned(pattern.id))
			);
		}

		const result = await db.authors.ban(
			author.id,
			author.email,
			author.username
		);
		logActivity(
			author.id,
			"Author Banned",
			`Author username: ${author.username}, Author ID: ${author.id}`
		);
		return res.json(result);
	} catch (error) {
		next(error);
	}
});

//GET /api/authors/:id
router.get("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		//Destructures the one author
		const author: AuthorsTable = await db.authors.one(id);
		delete author.password;
		delete author.email;
		delete author.created_at;
		res.json(author);
	} catch (error) {
		next(error);
	}
});

export default router;
