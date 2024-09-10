import { Router } from "express";

import db from "../../db";
import { verifyTokenAndRole } from "../../middlewares/admin.mw";
import { verifyAuthor } from "../../middlewares/author.mw";

const router = Router();
//Run all these routes prepended with the method through this middle ware
// router.route("*").post(checkToken).put(checkToken).delete(checkToken);

//GET api/patterns/:id
router.get("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		//The one pattern comes back in an array and this destructures it to only the pattern
		const result = await db.patterns.oneById(id);
		res.json(result);
	} catch (error) {
		//Goes to our global error handler
		next(error);
	}
});

//GET /api/patterns
router.get("/", async (req, res, next) => {
	try {
		const result = await db.patterns.all();
		res.json(result);
	} catch (error) {
		//Goes to our global error handler
		next(error);
	}
});

//POST api/patterns
router.post("/", async (req, res, next) => {
	try {
		const patternDTO = { ...req.body };
		//The insert
		const returnedHeaders = await db.patterns.insert(patternDTO);
		console.log(`insertedpattern`, returnedHeaders);
		//The get request to get what was just put in, in the form the navigation and frontend expects it back
		const pattern = await db.patterns.oneById(returnedHeaders.insertId);
		res.json({ pattern, message: "New pattern created" });
	} catch (error) {
		next(error);
	}
});

//DELETE api/patterns/:id
router.delete("/:id", verifyAuthor, verifyTokenAndRole, async (req, res, next) => {
	try {
		const id = req.params.id;
		await db.pattern_tags.destroyAllBasedOnPatternId(id);
		const result = await db.patterns.destroy(id);
		if (!result.affectedRows) {
			throw new Error("No affected rows");
		}
		res.json({ id, message: "Pattern deleted succesfully" });
	} catch (error) {
		next(error);
	}
});

//PUT /api/patterns/:id
router.put("/:id", async (req, res, next) => {
	const id: string = req.params.id;
	try {
		const patternDTO: { id: string; author_id: string; content: string } = {
			id: req.body.id,
			author_id: req.body.author_id,
			content: req.body.content,
		};
		console.log(`patternDTO`, patternDTO);
		await db.patterns.update(patternDTO);
		res.json({ id, message: "Pattern updated~!" });
	} catch (error) {
		next(error);
	}
});

export default router;
