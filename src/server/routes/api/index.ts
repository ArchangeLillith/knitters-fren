import { Router } from 'express';

import authorsRouter from './authors';
import commentRouter from './comments';
import logRouter from './logs';
import pattern_tagsRouter from './pattern_tags';
import patternsRouter from './patterns';
import searchRouter from './search';
import tagsRouter from './tags';

const router = Router();

router.use('/patterns', patternsRouter);
router.use('/comments', commentRouter);
router.use('/tags', tagsRouter);
router.use('/search', searchRouter);
router.use('/authors', authorsRouter);
router.use('/logs', logRouter);
router.use('/pattern_tags', pattern_tagsRouter);

export default router;
