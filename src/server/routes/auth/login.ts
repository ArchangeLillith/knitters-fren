import { Router } from "express";
import { handleLogin } from "../../middlewares/auth.mw";
import { createJWT } from "../../utils/tokens";

const router = Router();

//Passport is a route level middleware
router.post("/", handleLogin, (req, res, next) => {
	try {
		const token = createJWT(req.currentUser.id);
		res.json({ token });
	} catch (error) {
		next(error);
	}
});

export default router;
