import { Router } from "express";
import { createJWT } from "../../utils/tokens";
import db from "../../db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { logActivity } from "../../utils/logging";

const router = Router();

//POST /auth/register
router.post("/", async (req, res, next) => {
	console.log(`HIT /AUTH/REGISTER with body:`, req.body);
	try {
		const { email, password, username } = req.body;
		if (!email || !isValidEmail(email)) {
			const error = new Error("invalid email");
			error["status"] = 400;
			console.log(`invalid email`);
			throw error;
		}
		const [emailFound] = await db.authors.find(email);
		if (emailFound) {
			const error = new Error("email already registered");
			error["status"] = 400;
			console.log(`email registered already`);
			throw error;
		}

		//Should look like {username, email, password, uuid and role created here too}
		//This could be ...req.body but I felt it was nice to have the safety that only what we want is here regardless of what's in the req.body. there's little chance that anything would happen, but for me it's an extra layer of comfort, knwoing my code does exactly what I want it to
		const authorDTO = {
			id: uuidv4(),
			password,
			username,
			email,
			role: "user",
		};

		const salt = await bcrypt.genSalt(12);
		const hash = await bcrypt.hash(password, salt);

		authorDTO.password = hash;
		await db.authors.insert(authorDTO);
		delete authorDTO.password;
		const token = createJWT(authorDTO.id, authorDTO.role);
		logActivity(
			authorDTO.id,
			"New user registered to site~",
			`Username: ${authorDTO.username}, Role: ${authorDTO.role}`
		);
		res.json({ token });
	} catch (error) {
		next(error);
	}
});

function isValidEmail(email: string) {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
}

export default router;
