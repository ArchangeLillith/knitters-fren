import { Router } from 'express';

import db from '../../db';
import {
	PatternObject,
	PatternObjectQuery,
	PatternTable,
	Tag,
} from '../../types';
import { queryToPatternObject } from '../../utils/functions';

const router = Router();

//* everything in this file should return a {patternObject: PaternObject[]}

//GET /api/search/author/:param
router.get('/author/:queryString', async (req, res, next) => {
	const author = req.params.queryString;
	try {
		const result: PatternObjectQuery[] = await db.search.findByAuthor(author);
		const patternsObject: PatternObject[] = queryToPatternObject(result);
		res.json(patternsObject);
	} catch (error) {
		next(error);
	}
});

// GET /api/search/title/:queryString
router.get('/title/:queryString', async (req, res, next) => {
	const title = req.params.queryString;
	try {
		const result = await db.search.findByTitle(title);
		const patternsObject: PatternObject[] = queryToPatternObject(result);
		res.json(patternsObject);
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
		res.json({ patterns: result });
	} catch (error) {
		next(error);
	}
});

//POST /api/search/tag
router.post('/tag', async (req, res, next) => {
	try {
		let tags: Tag[];
		try {
			tags = JSON.parse(req.body.tagList);
		} catch {
			return res.status(400).json({ message: 'Invalid JSON format' });
		}

		const tagIds: number[] = tags.map((tag: Tag) => tag.id);

		const result: PatternObjectQuery[] = [];
		try {
			await Promise.all(
				tagIds.map(async (id: number) => {
					const [pattern] = await db.search.findByTags(id);
					console.log(`Pattern`, pattern);
					result.push(pattern);
				})
			);
			console.log(`result`, result);
		} catch {
			return res.status(500).json({ message: 'Database error' });
		}

		if (!result || result.length === 0) {
			return res.status(404).json({ message: 'No patterns found' });
		}
		const formattedPatterns = queryToPatternObject(result);
		console.log(`Fetched`, formattedPatterns);
		const finalPatterns: PatternObject[] = [];
		const uniquePatternIds = new Set<string>();

		formattedPatterns.forEach(pattern => {
			if (!uniquePatternIds.has(pattern.pattern.id)) {
				uniquePatternIds.add(pattern.pattern.id);
				finalPatterns.push(pattern);
			}
		});
		console.log(`final`, finalPatterns);
		return res.json(finalPatterns);
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
		} catch {
			return res.status(400).json({ message: 'Invalid JSON format' });
		}
		const idArray: number[] = tags.map((tag: Tag) => tag.id);

		const patternPromises = db.search.findByTagsStrict(idArray);

		try {
			finalPatterns = await patternPromises;
		} catch {
			return res.status(500).json({ message: 'Database error' });
		}

		if (finalPatterns.length === 0) {
			return res.json(404).json({ message: 'No patterns found' });
		}

		//!here
		res.json({ patterns: finalPatterns });
	} catch (err) {
		console.log(`ERROR`, err);
		next(err);
	}
});

export default router;
