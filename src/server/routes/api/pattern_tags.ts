import { Router } from "express";
import db from "../../db";

const router = Router();

export default router;

//GET /api/pattern_tags/id
router.get("/:id", async (req, res, next) => {
	try {
		const id = parseInt(req.params.id);
		const result = await db.pattern_tags.allByPatternId(id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

//POST /api/pattern_tags/id
router.post("/:id", async (req, res, next) => {
	//Input to insert: values: { pattern_id: number; tag_id: number }[]
	const pattern_id = parseInt(req.params.id);
	const idArray = JSON.parse(req.body.tagList).tag_id;
	const values: [number, number][] = [];
	for (let i = 0; i < idArray.length; i++) {
		const tag_id: number = parseInt(idArray[i]);
		values.push([pattern_id, tag_id]);
	}
	console.log(`VALUES`, values);
	try {
		const result = await db.pattern_tags.insert(values);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

//PUT /api/pattern_tags/id
router.post("/:id", async (req, res, next) => {
	//Input to insert: values: { pattern_id: number; tag_id: number }[]
	const pattern_id = parseInt(req.params.id);
	const idArray = JSON.parse(req.body.tagList).tag_id;
	const values: [number, number][] = [];
	for (let i = 0; i < idArray.length; i++) {
		const tag_id: number = parseInt(idArray[i]);
		values.push([pattern_id, tag_id]);
	}
	console.log(`VALUES`, values);
	try {
		const result = await db.pattern_tags.insert(values);
		res.json(result);
	} catch (error) {
		next(error);
	}
});
