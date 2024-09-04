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

const app = express();

// Apply CORS middleware for all environments
app.use(
	cors({
		origin: ["http://localhost:8000"], // Adjust origins as needed
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Health checks to ensure we've got the server up and running
app.get("/status", (req, res) => {
	res.sendStatus(200);
});
app.head("/status", (req, res) => {
	res.sendStatus(200);
});

configurePassport(app);
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("public"));
}

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(config.app.port, () =>
	console.log(`Server running on port ${config.app.port}~`)
);
