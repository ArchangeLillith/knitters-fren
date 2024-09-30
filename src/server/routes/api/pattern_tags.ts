import { Router } from 'express';

import { getCache } from '../../cache';
import db from '../../db';
import { Tag } from '../../types';

const router = Router();

export default router;

//GET /api/pattern_tags/id
router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	const tagArrayPerPattern: number[] = getCache(`patternTags.${id}`);
	const allTagsFromCache = getCache('allTags');

	if (tagArrayPerPattern !== null && allTagsFromCache !== null) {
		console.log(`Cache is valid, proceeding with cached data`);
		const associatedTags: Tag[] = [];
		for (const tag_id of tagArrayPerPattern) {
			allTagsFromCache[tag_id].push(associatedTags);
		}
		console.log(
			`associatedTags should be {id: number, name: string}[]`,
			associatedTags
		);
	} else {
		try {
			const result = await db.pattern_tags.allByPatternId(id);
			res.json(result);
		} catch (error) {
			next(error);
		}
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
	const idArray = JSON.parse(req.body.tagList).tag_ids;
	const values: [string, number][] = [];
	for (let i = 0; i < idArray.length; i++) {
		const tag_id: number = parseInt(idArray[i]);
		values.push([pattern_id, tag_id]);
	}
	try {
		const result = await db.pattern_tags.insert(values);
		res.json(result);
	} catch (error) {
		next(error);
	}
});
