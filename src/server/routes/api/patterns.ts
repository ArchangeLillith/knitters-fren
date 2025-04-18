import { Router } from 'express';
import { ResultSetHeader } from 'mysql2';

import { getCache, markCacheAsDirty, setCache } from '../../cache';
import { buildCache } from '../../cache/buildCache';
import db from '../../db';
import patterns from '../../db/queries/patterns';
import { verifyAdmin } from '../../middlewares/verifyAdmin.mw';
import { verifyAuthor } from '../../middlewares/verifyAuthor.mw';
import { verifyToken } from '../../middlewares/verifyToken.mw';
import { PatternObject, PatternObjectQuery } from '../../types';
import {
	formatAndRemovePaid,
	removeNullTags,
	removePaid,
} from '../../utils/functions';
import { logActivity } from '../../utils/logging';

const router = Router();

//GET /api/patterns
router.get('/', verifyToken, async (req, res, next) => {
	try {
		const author_id = req.currentUser ? req.currentUser.id : null;
		const cachedRes: PatternObject[] = getCache('allPatterns');

		let patternsObject: PatternObject[];

		if (cachedRes !== null) {
			patternsObject = removePaid(cachedRes, author_id);
			patternsObject = removeNullTags(patternsObject);
			console.log(`Return from cache after formatting`, patternsObject);
		} else {
			const result: PatternObjectQuery[] = await db.patterns.all();
			patternsObject = formatAndRemovePaid(result, author_id);
			console.log(`Return from DB after formatting`, patternsObject);
		}

		if (patternsObject.length > 0 && cachedRes === null) {
			setCache('allPatterns', patternsObject);
			buildCache();
		}

		res.json(patternsObject);
	} catch (error) {
		next(error);
	}
});

//GET api/patterns/:id
router.get('/:id', verifyToken, async (req, res, next) => {
	try {
		const id = req.params.id;
		const author_id = req.currentUser ? req.currentUser.id : null;
		const cachedRes: PatternObject[] = getCache(`allPatterns.${id}`);
		//Formatting like this to we can use the removePaid and Null
		console.log(`return from cache,`, cachedRes);
		let patternObject: PatternObject[] = cachedRes;

		if (patternObject !== null) {
			console.log(`Pattern onject !== null`);
			patternObject = removePaid(patternObject, author_id);
			console.log(`patternobj`, patternObject);
		} else {
			const result: PatternObjectQuery[] = [await db.patterns.oneById(id)];
			console.log(`Resultt`, result);
			patternObject = removeNullTags(result);
			if (result[0].paid === 'true' && author_id !== result[0].author_id) {
				res.status(401).json({ message: 'Pattern inaccessible' });
			}
			setCache(`allPatterns.${id}`, patternObject);
		}
		console.log(`returnin pattern:`, patternObject);
		res.json(patternObject);
	} catch (error) {
		next(error);
	}
});

//POST api/patterns
router.post('/', async (req, res, next) => {
	try {
		const patternDTO = { ...req.body };
		//The insert
		const returnedHeaders = await db.patterns.insert(patternDTO);
		//The get request to get what was just put in, in the form the navigation and frontend expects it back
		if (returnedHeaders.affectedRows > 0) {
			const pattern = await db.patterns.oneById(patternDTO.id);
			logActivity(
				pattern.author_id,
				'New pattern created!',
				`Pattern title: ${pattern.title}, Author: ${pattern.username}`
			);
			markCacheAsDirty('allPatterns');
			res.json({ pattern, message: 'New pattern created' });
		} else {
			const error = new Error('Pattern not addded');
			next(error);
		}
	} catch (error) {
		next(error);
	}
});

//DELETE api/patterns/:id
router.delete(
	'/:id',
	verifyToken,
	verifyAuthor,
	verifyAdmin,
	async (req, res, next) => {
		try {
			const id = req.params.id;
			const { author_id, title, username } = await patterns.oneById(id);
			await db.pattern_tags.destroyAllBasedOnPatternId(id);
			await db.favorite_patterns.destroyFavorite(id);
			const result: ResultSetHeader = await db.patterns.destroy(id);
			if (!result.affectedRows) {
				throw new Error('No affected rows');
			}
			logActivity(
				req.currentUser.id,
				'Pattern deleted',
				`Pattern title: ${title}, Author: ${username}, Author ID: ${author_id}`
			);
			markCacheAsDirty('allPatterns');
			res.json(result);
		} catch (error) {
			next(error);
		}
	}
);

//PUT /api/patterns/:id
router.put('/:id', async (req, res, next) => {
	const id: string = req.params.id;
	try {
		const patternDTO: {
			id: string;
			title: string;
			link: string | undefined;
			paid: 'true' | 'false';
			content: string;
		} = {
			id: req.body.id,
			title: req.body.title,
			content: req.body.content,
			link: req.body.link,
			paid: req.body.paid,
		};
		console.log(`patternDTO`, patternDTO);
		await db.patterns.update(patternDTO);
		markCacheAsDirty('allPatterns');
		res.json({ id, message: 'Pattern updated~!' });
	} catch (error) {
		next(error);
	}
});

export default router;
