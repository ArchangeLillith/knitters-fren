import { Router } from 'express';

import authorsRouter from './authors';
import commentRouter from './comments';
import favorite_patternsRouter from './favorite_patterns';
import logRouter from './logs';
import pattern_tagsRouter from './pattern_tags';
import patternsRouter from './patterns';
import searchRouter from './search';
import tagsRouter from './tags';

const router = Router();

router.use('/authors', authorsRouter);
router.use('/comments', commentRouter);
router.use('/favorite_patterns', favorite_patternsRouter);
router.use('/logs', logRouter);
router.use('/pattern_tags', pattern_tagsRouter);
router.use('/patterns', patternsRouter);
router.use('/search', searchRouter);
router.use('/tags', tagsRouter);

export default router;
