import { Router } from "express";
import db from "../../db";
import { IAuthorsTable } from "../../types";

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

//GET /api/author/:id
router.get("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		//Destructures the one author
		const result: IAuthorsTable = await db.authors.one(id);
		const author = result[0];
		delete author.password;
		delete author.email;
		delete author.created_at;
		res.json(author);
	} catch (error) {
		next(error);
	}
});

export default router;
