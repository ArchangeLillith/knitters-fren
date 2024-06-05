import { Router } from "express";
import patternsRouter from "./patterns";
import tagsRouter from "./tags";
import authorsRouter from "./authors";
import contactRouter from "./contact";
import paymentRouter from "./payment";
// import pattern_tagsRouter from "./pattern_tags";

const router = Router();

router.use("/patterns", patternsRouter);
router.use("/tags", tagsRouter);
router.use("/authors", authorsRouter);
router.use("/contact", contactRouter);
router.use("/payment", paymentRouter);
// router.use("/pattern_tags", pattern_tagsRouter);

export default router;
