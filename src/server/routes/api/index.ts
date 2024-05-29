import { Router } from "express";
import patternsRouter from "./patterns";

const router = Router();

router.use("/patterns", patternsRouter);

export default router;
