import passport from "passport";
import PassportLocal from "passport-local";
import PassportJWT from "passport-jwt";
import bcrypt from "bcrypt";
import db from "../db";
import config from "../config";
import type { Express } from "express";

export function configurePassport(app: Express) {
	passport.use(
		new PassportLocal.Strategy(
			{
				session: false,
			},
			async (username, password, done) => {
				try {
					const [userFound] = await db.authors.find(username);
					if (
						userFound &&
						(await bcrypt.compare(password, userFound.password))
					) {
						delete userFound.password;
						return done(null, userFound);
					}

					done(null, false, { message: "invalid credentials" });
				} catch (error) {
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
				try {
					done(null, payload);
				} catch (error) {
					done(error);
				}
			}
		)
	);

	app.use(passport.initialize());
}
