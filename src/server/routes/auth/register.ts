import { Router } from "express";
import { createJWT } from "../../utils/tokens";
import { v4 as uuidv4 } from "uuid";
import db from "../../db";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async (req, res, next) => {
	try {
		const { email, password } = req.body;
		//Check if the email is valid
		if (!email || isValidEmail(email)) {
			//Create the specific error
			const error = new Error("Invalid Email");
			error["status"] = 400;
			//Throw the specific error. This is caught by the catch at the end of the block, which is then passed up to the next middleware to be handled up higher
			throw error;
		}

		//Check if email is already registered
		const [emailfound] = await db.authors.find("email", email);
		//emailFound will return either the object that is found in the database or null if nothing is found
		if (emailfound) {
			//Create our specific error
			const error = new Error("That email is already registered");
			error["status"] = 400;
			//Throw our sepcific error
			throw error;
		}

		//Generate a uuid for the author
		const userDTO = {
			id: uuidv4(),
			...req.body,
		};

		//Salt and hash their password using bcrypt
		const salt = await bcrypt.genSalt(12);
		const hash = await bcrypt.hash(password, salt);
		userDTO.password = hash;

		//Insert the user into the database
		const result = await db.authors.insert(userDTO);
		delete userDTO.password;

		//Create and send their token
		const token = createJWT(userDTO.id);
		res.json({ token });
	} catch (error) {
		next(error);
	}
});

export default router;

function isValidEmail(email: string) {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
}
