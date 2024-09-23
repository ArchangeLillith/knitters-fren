import { Router } from 'express';

import db from '../../db';

const router = Router();

export default router;

//GET /api/pattern_tags/
router.get('/', async (req, res, next) => {
	try {
		const result = await db.pattern_tags.all();
		res.json(result);
	} catch (error) {
		next(error);
	}
});
//GET /api/pattern_tags/id
router.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const result = await db.pattern_tags.allByPatternId(id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

// //*If something throws a fit it's prob this
// //POST /api/pattern_tags/delete/id
// router.post('/delete/:id', async (req, res, next) => {
// 	//Input to insert: values: { pattern_id: number; tag_ids: number[] }
// 	const pattern_id = req.params.id;
// 	const idArray = JSON.parse(req.body.tagList).tag_ids;
// 	const values: [string, number][] = [];
// 	for (let i = 0; i < idArray.length; i++) {
// 		const tag_id: number = parseInt(idArray[i]);
// 		values.push([pattern_id, tag_id]);
// 	}
// 	try {
// 		await db.pattern_tags.destroyAllBasedOnPatternId(pattern_id);
// 		try {
// 			const result = await db.pattern_tags.insert(values);
// 			res.json(result);
// 		} catch (insertError) {
// 			next(insertError);
// 		}
// 	} catch (destroyError) {
// 		next(destroyError);
// 	}
// });

//POST /api/pattern_tags/pattern_id
router.post('/:id', async (req, res, next) => {
	//Input to insert: values: { pattern_id: number; tag_id: number }[]
	const pattern_id = req.params.id;
	console.log(`Pattern ID:`, pattern_id);
	const idArray = JSON.parse(req.body.tagList).tag_ids;
	const values: [string, number][] = [];
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
