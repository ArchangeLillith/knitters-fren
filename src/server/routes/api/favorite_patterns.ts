import { Router } from 'express';

import db from '../../db';
import { PatternTable } from '../../types';

const router = Router();

export default router;

//GET /api/favorite_patterns
router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		const jointTableData = await db.favorite_patterns.allByAuthorId(id);
		const patterns: PatternTable[] = [];
		for (const row of jointTableData) {
			const pattern = await db.patterns.oneById(row.pattern_id);
			patterns.push(pattern);
		}
		res.json(patterns);
	} catch (error) {
		console.log(`Error`);
		next(error);
	}
});
