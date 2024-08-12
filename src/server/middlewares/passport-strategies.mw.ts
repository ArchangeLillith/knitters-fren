import db from "../db";
import * as passport from "passport";
import * as PassportLocal from "passport-local";
import { compareHash } from "../utils/bcrypt";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
	new PassportLocal.Strategy(
		{
			//This tells passport that our usename isn't under the key username
			usernameField: "email",
		},
		async (email, password, done) => {
			try {
				const [userFound] = await db.authors.find("email", email);
				if (userFound && compareHash(password, userFound.password)) {
					//This is where we determine what's in the token
					done(null, userFound);
				} else {
					done(null, false);
				}
			} catch (error) {
				done(error);
			}
		}
	)
);
