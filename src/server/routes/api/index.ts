import { Router } from "express";
import patternsRouter from "./patterns";
import tagsRouter from "./tags";
import authorsRouter from "./authors";
import searchRouter from "./search";
import logRouter from "./logs";


import pattern_tagsRouter from "./pattern_tags";

const router = Router();

router.use("/patterns", patternsRouter);
router.use("/tags", tagsRouter);
router.use("/search", searchRouter);
router.use("/authors", authorsRouter);
router.use("/logs", logRouter);
router.use("/pattern_tags", pattern_tagsRouter);

export default router;