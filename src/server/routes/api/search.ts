import { Router } from 'express';

import db from '../../db';
import { PatternTable, Tag } from '../../types';

const router = Router();

//GET /api/search/author/:param
router.get('/author/:queryString', async (req, res, next) => {
	const author = req.params.queryString;
	try {
		const result = await db.search.findByAuthor(author);
		if (result.length === 0) {
			return res.json({ message: 'no pattern' });
		}
		res.json({ patterns: result, message: 'patterns found' });
	} catch (error) {
		next(error);
	}
});

// GET /api/search/title/:queryString
router.get('/title/:queryString', async (req, res, next) => {
	const title = req.params.queryString;
	try {
		const result = await db.search.findByTitle(title);
		if (result.length === 0) {
			return res.json({ message: 'no pattern' });
		}
		res.json({ patterns: result, message: 'patterns found' });
	} catch (error) {
		next(error);
	}
});

//GET /api/search/content/:param
router.get('/content/:queryString', async (req, res, next) => {
	const contentString = req.params.queryString;
	try {
		const result = await db.search.findByContent(contentString);
		if (result.length === 0) {
			return res.status(404).json({ message: 'No patterns found' });
		}
		res.json({ patterns: result, message: 'Patterns found' });
	} catch (error) {
		next(error);
	}
});

//POST /api/search/tag
router.post('/tag', async (req, res, next) => {
	try {
		const finalPatterns: PatternTable[] = [];
		let tags: Tag[];

		try {
			tags = JSON.parse(req.body.tagList);
		} catch (err) {
			return res.status(400).json({ message: 'Invalid JSON format' });
		}
		const idArray: number[] = tags.map((tag: Tag) => tag.id);

		const patternPromises = idArray.map((id: number) => {
			return db.search.findByTags(id);
		});

		let result: PatternTable[][];
		try {
			result = await Promise.all(patternPromises);
		} catch (err) {
			return res.status(500).json({ message: 'Database error' });
		}

		if (result.length === 0) {
			return res.json(404).json({ message: 'No patterns found' });
		}

		//This Array could be a Set, however it's less performant because there's no deletion from the list. This is because the deletion of something from a set is faster than deletion from an array, but only if the data list is cresting 100k items. A small project like this website isn't effected by such a small change, however, and either could be used here with negligible affects on the user experiance, however array was chosen as it's a better use case even if the data gets very large seeing as there will be no deletion from this specific list.
		const uniquePatterns = [];
		result.forEach((patterns: PatternTable[]) => {
			patterns.forEach((pattern: PatternTable) => {
				if (!uniquePatterns.includes(pattern.id)) {
					uniquePatterns.includes(pattern.id);
					finalPatterns.push(pattern);
				}
			});
		});
		res.json({ patterns: finalPatterns, message: 'Patterns found~' });
	} catch (err) {
		console.log(`ERROR`, err);
		next(err);
	}
});

//POST /api/search/tag/strict
router.post('/tag/strict', async (req, res, next) => {
	try {
		let finalPatterns: PatternTable[] = [];
		let tags: Tag[];

		try {
			tags = JSON.parse(req.body.tagList);
		} catch (err) {
			return res.status(400).json({ message: 'Invalid JSON format' });
		}
		const idArray: number[] = tags.map((tag: Tag) => tag.id);

		const patternPromises = db.search.findByTagsStrict(idArray);

		try {
			finalPatterns = await patternPromises;
		} catch (err) {
			return res.status(500).json({ message: 'Database error' });
		}

		if (finalPatterns.length === 0) {
			return res.json(404).json({ message: 'No patterns found' });
		}

		res.json({ finalPatterns, message: 'Patterns found~' });
	} catch (err) {
		console.log(`ERROR`, err);
		next(err);
	}
});

export default router;
