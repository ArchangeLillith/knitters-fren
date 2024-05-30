import { Router } from "express";
import patternsRouter from "./patterns";
import tagsRouter from "./tags";
import authorsRouter from "./authors";
// import pattern_tagsRouter from "./pattern_tags";

const router = Router();

router.use("/patterns", patternsRouter);
router.use("/tags", tagsRouter);
router.use("/authors", authorsRouter);
// router.use("/pattern_tags", pattern_tagsRouter);

export default router;
