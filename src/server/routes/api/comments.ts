import { Router } from "express";
import db from "../../db";

const router = Router();

export default router;

//GET /api/comments/pattern_id
router.get("/", async (req, res, next) => {
	try {
		const result = await db.comments.all();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

//GET /api/comments/pattern_id
router.get("/:id", async (req, res, next) => {
	const id = req.params.id;
	try {
		const result = await db.comments.allByPattern(id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

//POST /api/comments/pattern_id
router.post("/:id", async (req, res, next) => {
	const commentDTO = { ...req.body };
	try {
		const result = await db.comments.addNewComment(commentDTO);
		res.json(result);
	} catch (error) {
		next(error);
	}
});
