import express from "express";
import * as passport from "passport";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

import "./middlewares/passport-strategies.mw";

const app = express();

if (isDevelopment) {
	app.use(cors());
}

//Health check~ Highest possible level of request to be able to check if its an endpoint that's not working or if your whole backend crashed
app.get("status", (req, res) => {
	res.sendStatus(200);
});
app.head("status", (req, res) => {
	res.sendStatus(200);
});

app.use(passport.initialize());
app.use(express.static("public"));
//Telling the backend to expect json, and telling it to use express to parse the json
app.use(express.json());
//Logging on the top level for any of our routes
app.use(morgan("dev"));
//Tells the app to use the routes we want it to
app.use(routes);

if (isProduction) {
	app.use(express.static("public"));
}

//Tells our backeng that these are frontend routes and to instead throw the request to the frontend
app.get(
	[
		"/login",
		"/profile",
		"/register",
		"/patterns",
		"/patterns/:id",
		"/patterns/new",
		"/patterns/:id/update",
		"/search",
		"/search/*",
	],
	(req, res) => res.sendFile(path.join(__dirname, "../public/index.html"))
);

// 404 fallback for client side routing
if (isProduction) {
	app.get("*", (req, res) => {
		res.sendFile("index.html", { root: "public" });
	});
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
