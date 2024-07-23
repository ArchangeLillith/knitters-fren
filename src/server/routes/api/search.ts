import { Router } from "express";
import db from "../../db";
import patterns from "../../db/queries/patterns";
import { IPatternTable, Tag } from "../../types";

const router = Router();

//GET /api/search/title/:param
router.get("/title/:queryString", async (req, res, next) => {
	let title = `'%${req.params.queryString}%'`;
	console.log(`TITLE`, title);
	try {
		const result = await db.search.findByTitle(title);
		console.log(`RESULT`, result);
		if (result.length >= 0) {
			throw new Error("No patterns found");
		}
		res.json({ result, message: "Patterns found" });
	} catch (error) {
		next(error);
	}
});

//POST /api/search/tag
router.post("/tag", async (req, res, next) => {
	const finalPatterns: IPatternTable[] = [];
	const tags = JSON.parse(req.body.tagList);
	const idArray = tags.map((tag: Tag) => tag.id);

	try {
		const patternPromises = idArray.map((id: number) =>
			db.search.findByTags(id)
		);
		const result = await Promise.all(patternPromises);

		const uniquePatterns = new Set();

		result.forEach((result) => {
			if (result.length <= 0) {
				throw new Error("No patterns found");
			}
			result.forEach((pattern: IPatternTable) => {
				if (!uniquePatterns.has(pattern.id)) {
					uniquePatterns.add(pattern.id);
					finalPatterns.push(pattern);
				}
			});
		});
		res.json({ finalPatterns, message: "Patterns found" });
	} catch (error) {
		next(error);
	}
});

export default router;
