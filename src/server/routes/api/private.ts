import { Router } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

const router = Router();

router.get("/", (req, res) => {
	try {
		const bearerToken = req.headers.authorization?.split(" ");
		const token =
			bearerToken && bearerToken[0] === "Bearer" ? bearerToken[1] : null;

		if (!bearerToken || !token) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}
		const payload = jwt.verify(token, config.jwt.secret);
		console.log(`payload`, payload);
		res.json({ message: "This is a private endpoint" });
	} catch (error) {
		res.status(500).json({ message: "Backend error", error: error.message });
	}
});

export default router;