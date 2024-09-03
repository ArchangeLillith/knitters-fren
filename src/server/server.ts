import express from "express";
import morgan from "morgan";
import config from "./config";
import cors from "cors";

import routes from "./routes";
import {
	globalErrorHandler,
	notFoundHandler,
} from "./middlewares/error-handlers.mw";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const app = express();

//Health checks to ensure we've got the server up and running
app.get("/status", (req, res) => {
	res.sendStatus(200);
});
app.head("/status", (req, res) => {
	res.sendStatus(200);
});

app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);

if (isProduction) {
	app.use(express.static("public"));
}
if (isDevelopment) {
	app.use(cors());
}
app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(config.app.port, () =>
	console.log(`Server running on port ${config.app.port}~`)
);
