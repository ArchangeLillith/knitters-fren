import { Router } from "express";
import { checkToken } from "../../middlewares/handleLogin.mw";

const router = Router();

// GET /auth/validate/me
router.get("/me", checkToken, (req, res, next) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		next(error);
	}
});

export default router;
