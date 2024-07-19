import { Router } from "express";


const router = Router();

//GET /api/title/:param
router.get("/title/:queryString", async (req, res, next) => {
	const param= req.params.queryString
	try {
		console.log(`Param is:`, param);
	} catch (error) {
		next(error);
	}
});

export default router;
