import config from "../../config";
import * as jwt from "jsonwebtoken";
import { authenticate } from "passport";
import { Router } from "express";

const router = Router();

//POST /auth/login
router.post(
	"/",
	authenticate("local", { session: false }),
	async (req, res) => {
		try {
			const token = jwt.sign(
				{ userId: req.user.id, email: req.user.email, role: req.user.role },
				config.jwt.secret,
				{ expiresIn: "30d" }
			);
			res.json("plz");
		} catch (error) {
			console.log(`ERROR`, error);
			res.status(500).json({ message: `Error is ${error}` });
		}
	}
);

export default router;
