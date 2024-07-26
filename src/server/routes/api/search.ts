import { Router } from "express";
import db from "../../db";
import patterns from "../../db/queries/patterns";
import { IPatternTable, Tag, Tags } from "../../types";

const router = Router();

//GET /api/search/title/:param
router.get("/title/:queryString", async (req, res, next) => {
	let title = req.params.queryString;
	try {
		const result = await db.search.findByTitle(title);
		if (result.length === 0) {
			return res.status(404).json({ message: "No patterns found" });
		}
		res.json({ result, message: "Patterns found" });
	} catch (error) {
		console.error("Error fetching patterns:", error);
		next(error);
	}
});

//POST /api/search/tag
router.post("/tag", async (req, res, next) => {
	try {
		const finalPatterns: IPatternTable[] = [];
		let tags: Tags;

		try {
			tags = JSON.parse(req.body.tagList);
		} catch (err) {
			return res.status(400).json({ message: "Invalid JSON format" });
		}
		const idArray: number[] = tags.map((tag: Tag) => tag.id);

		const patternPromises = idArray.map((id: number) => {
			return db.search.findByTags(id);
		});

		//Zach what type is this??
		let result;
		try {
			result = await Promise.all(patternPromises);
		} catch (err) {
			return res.status(500).json({ message: "Database error" });
		}

		if (result.length === 0) {
			return res.json(404).json({ message: "No patterns found" });
		}

		console.log(`RESULT`, result);
		const uniquePatterns = new Set();
		result.forEach((patterns: IPatternTable[]) => {
			patterns.forEach((pattern: IPatternTable) => {
				if (!uniquePatterns.has(pattern.id)) {
					uniquePatterns.add(pattern.id);
					finalPatterns.push(pattern);
				}
			});
		});
		res.json({ finalPatterns, message: "Patterns found~" });
	} catch (err) {
		console.log(`ERROR`, err);
		next(err);
	}
});

export default router;
