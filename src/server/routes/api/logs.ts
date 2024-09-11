import { Router } from "express";
import db from "../../db";

const router = Router();

export default router;

//GET /api/logs
router.get("/", async (req, res, next) => {
	try {
		const result = await db.logs.all();
		res.json(result);
	} catch (error) {
		next(error);
	}
});
