import { Router } from "express";
import { checkToken } from "../../middlewares/auth.mw";

const router = Router();

router.get("/me", checkToken, (req, res, next) => {
	try {
		res.status(200).json({ message: "Validated" });
	} catch (error) {
		next(error);
	}
});

export default router;
