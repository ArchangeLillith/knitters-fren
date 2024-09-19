import { Router } from "express";
import { handleLogin } from "../../middlewares/handleLogin.mw";
import { createJWT } from "../../utils/tokens";

const router = Router();

// POST /auth/login
router.post("/", handleLogin, (req, res, next) => {
	try {
		const token = createJWT(req.currentUser.id, req.currentUser.role);
		res.json(token);
	} catch (error) {
		next(error);
	}
});

export default router;
