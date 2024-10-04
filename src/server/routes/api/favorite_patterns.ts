import { Router } from 'express';

import db from '../../db';
import { PatternObject, PatternObjectQuery } from '../../types';
import { queryToPatternObject, removeNullTags } from '../../utils/functions';

const router = Router();

export default router;

//GET /api/favorite_patterns/id
router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		const result: PatternObjectQuery[] =
			await db.favorite_patterns.allByAuthorId(id);
		let patterns: PatternObject[] = queryToPatternObject(result);
		patterns = removeNullTags(patterns);
		res.json(patterns);
	} catch (error) {
		next(error);
	}
});

//POST /api/favorite_patterns/id
router.post('/:id', async (req, res, next) => {
	const author_id = req.params.id;
	const pattern_id = req.body.pattern_id;
	try {
		const result = await db.favorite_patterns.addFavorite(
			author_id,
			pattern_id
		);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

//DELETE /api/favorite_patterns/id
router.delete('/:author_id/:pattern_id', async (req, res, next) => {
	const { author_id, pattern_id } = req.params;
	try {
		const result = await db.favorite_patterns.removeFavorite(
			author_id,
			pattern_id
		);
		console.log(`result,`, result);
		res.json(result);
	} catch (error) {
		console.log(`Error`);
		next(error);
	}
});
