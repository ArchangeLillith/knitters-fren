import passport, { Passport } from "passport";
import PassportLocal from "passport-local";
import PassportJWT from "passport-jwt";
//importing a type has NO impact on prod, this only pulls in the type and since TS compiles to JS the types don't follow
import type { Express } from "express";
import bcrypt from "bcrypt";
import config from "../config";
import db from "../db";

export function configurePassport(app: Express) {
	passport.use(
		new PassportLocal.Strategy(
			{
				//This rewires Passport to search for req.body.email not req.body.username that's default
				usernameField: "email",
				//We're stateless, meaning we don't need to worry about this because our token is stored in the front end
				session: false,
			},
			async (email, password, done) => {
				try {
					//check if the email exists
					const [userFound] = await db.authors.find("email", email);

					//If username and password checks out, done(good)
					if (
						userFound &&
						(await bcrypt.compare(password, userFound.password))
					) {
						//Delete the password in our data so it doesn't go any further
						delete userFound.password;
						//otherwise, done(good)
						return done(null, userFound);
					}

					//If one of those checks doesn't pass
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
