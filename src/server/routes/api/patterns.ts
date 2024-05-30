import { Router, query } from "express";
import { checkToken } from "../../middlewares/auth.mw";
import { v4 as uuidv4 } from "uuid";
import db from "../../db";

const router = Router();
//Run all these routes prepended with the method through this middle ware
// router.route("*").post(checkToken).put(checkToken).delete(checkToken);

//GET api/patterns/:id
router.get("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		//The one pattern comes back in an array and this destructures it to only the pattern
		const [result] = await db.patterns.one(id);
		res.json(result);
	} catch (error) {
		//Goes to our global error handler
		next(error);
	}
});

//GET /api/patterns
router.get("/", async (req, res, next) => {
	try {
		const result = await db.patterns.all();
		res.json(result);
	} catch (error) {
		//Goes to our global error handler
		next(error);
	}
});

router.get("/private", checkToken, async (req, res, next) => {
	try {
		res.json("Private endpoint");
	} catch (error) {
		next(error);
	}
});

//POST api/patterns
router.post("/", async (req, res, next) => {
	try {
		const patternDTO = { ...req.body };
		await db.patterns.insert(patternDTO);
		//The return here helps front end to reroute to the new id or the message can be picked up by a toaster or modal
		res.json({ id: patternDTO.id, message: "New pattern created" });
	} catch (error) {
		next(error);
	}
});

//DELETE api/patterns/:id
router.delete("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		const author_id = req.body.author_id;
		await db.pattern_tags.deleteTagsByPatternId(id);
		//Refactor if here there's an error it shouldn't continue
		const result = await db.patterns.destroy(id, author_id);
		if (!result.affectedRows) {
			throw new Error("Pattern does not exist");
		}

		res.json({ id, message: "Pattern deleted succesfully" });
	} catch (error) {
		next(error);
	}
});

//PUT /api/patterns/:id
router.put("/:id", async (req, res, next) => {
	try {
		const author_id = req.body.author_id;
		const id = req.params.id;
		const patternDTO = { title: req.body.title, content: req.body.content };
		console.log(`patternDTO`, patternDTO);
		await db.patterns.update(patternDTO, id, author_id);
		res.json({ id, message: "Pattern updated~!" });
	} catch (error) {
		next(error);
	}
});

export default router;
