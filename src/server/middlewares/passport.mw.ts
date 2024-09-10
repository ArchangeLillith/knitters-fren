import passport from "passport";
import PassportLocal from "passport-local";
import PassportJWT from "passport-jwt";
import bcrypt from "bcrypt";
import db from "../db";
import config from "../config";
import type { Express } from "express";

export function configurePassport(app: Express) {
	console.log("Configuring Passport strategies...");

	passport.use(
		new PassportLocal.Strategy(
			{
				session: false,
			},
			async (username, password, done) => {
				console.log(`Local strategy invoked for username: ${username}`);
				try {
					const [userFound] = await db.authors.find(username);
					console.log(`User found:`, userFound);
					if (
						userFound &&
						(await bcrypt.compare(password, userFound.password))
					) {
						delete userFound.password;
						return done(null, userFound);
					}

					done(null, false, { message: "Invalid credentials" });
				} catch (error) {
					console.log(`Error in local strategy:`, error);
					done(error);
				}
			}
		)
	);

	passport.use(
		new PassportJWT.Strategy(
			{
				jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: config.jwt.secret,
			},
			(payload, done) => {
				console.log("JWT strategy invoked");
				try {
					done(null, payload);
				} catch (error) {
					console.log("Error in JWT strategy:", error);
					done(error);
				}
			}
		)
	);

	app.use(passport.initialize());
}
