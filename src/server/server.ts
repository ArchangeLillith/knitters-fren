import express from "express";
import morgan from "morgan";
import config from "./config";
import cors from "cors";
import routes from "./routes";
import {
	globalErrorHandler,
	notFoundHandler,
} from "./middlewares/error-handlers.mw";
import { configurePassport } from "./middlewares/passport.mw";
import path from "path";

const app = express();

console.log(`Recomiled server.ts`);
// Apply CORS middleware for all environments
app.use(
	cors({
		origin: ["http://localhost:8000"],
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

console.log(`Running Node.js version: ${process.version}`);
configurePassport(app);
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);
//Refactor take these into an array elsewhere
app.get(
	[
		"/",
		"/login",
		"/profile",
		"/register",
		"/patterns",
		"/gallery",
		"/search",
		"/favorites",
		"/patterns/new",
		"/admin",
	],
	(req, res) => res.sendFile(path.join(__dirname, "../../public/index.html"))
);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("public"));
}
app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(config.app.port, () =>
	console.log(`Server running on port ${config.app.port}~`)
);
