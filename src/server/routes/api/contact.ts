import { Router } from "express";
import Mailgun from "mailgun.js";
import formData from "form-data";
import config from "../../config";

const mailgun = new Mailgun(formData).client({
	username: "api",
	key: config.mailgun.apiKey,
});
const router = Router();

//POST /api/contact
//{from: string, subject: string, message: string}
router.post("/", async (req, res, next) => {
	try {
		console.log(`Post in backend hit`);
		console.log(`Req.body`, req.body);
		const newEmail = { ...req.body };
		const result = await mailgun.messages.create(config.mailgun.domain, {
			to: [config.mailgun.toEmail],
			subject: newEmail.subject,
			from: newEmail.from,
			text: newEmail.message,
		});
		res.json(result);
	} catch (error) {
		next(error);
	}
});

export default router;
