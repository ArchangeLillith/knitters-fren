import { Router } from "express";

import db from "../../db";
import { verifyToken } from "../../middlewares/verifyToken.mw";
import { verifyAuthor } from "../../middlewares/verifyAuthor.mw";
import { logActivity } from "../../utils/logging";
import patterns from "../../db/queries/patterns";

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
		//The get request to get what was just put in, in the form the navigation and frontend expects it back
		if (returnedHeaders.affectedRows > 0) {
			const pattern = await db.patterns.oneById(patternDTO.id);
			logActivity(
				pattern.author_id,
				"New pattern created!",
				`Pattern title: ${pattern.title}, Author: ${pattern.username}`
			);
			res.json({ pattern, message: "New pattern created" });
		} else {
			const error = new Error("Pattern not addded");
			next(error);
		}
	} catch (error) {
		next(error);
	}
});

//DELETE api/patterns/:id
router.delete("/:id", verifyToken, verifyAuthor, async (req, res, next) => {
	try {
		const id = req.params.id;
		const { author_id, title, username } = await patterns.oneById(id);
		await db.pattern_tags.destroyAllBasedOnPatternId(id);
		const result = await db.patterns.destroy(id);
		if (!result.affectedRows) {
			throw new Error("No affected rows");
		}
		logActivity(
			req.currentUser.id,
			"Pattern deleted",
			`Pattern title: ${title}, Author: ${username}, Author ID: ${author_id}`
		);
		res.json({ id, message: "Pattern deleted succesfully" });
	} catch (error) {
		next(error);
	}
});

//PUT /api/patterns/:id
router.put("/:id", async (req, res, next) => {
	const id: string = req.params.id;
	try {
		const patternDTO: {
			id: string;
			content: string;
			title: string;
		} = {
			id: req.body.id,
			title: req.body.title,
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
