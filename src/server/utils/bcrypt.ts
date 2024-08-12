import * as bcrypt from "bcrypt";
/**
 * @param userInput - the user input into the password box
 * @param hashedPass - the hash from the backend associated with the email given by the user
 * Compares the user input to the hash we have in the database to see if this user should be allowed access
 * @returns a boolean, true if the hash matches the password and false if they don't match
 */
export function compareHash(userInput: string, hashedPass: string) {
	return bcrypt.compareSync(userInput, hashedPass);
}

/**
 *
 * @param password - the string entered on the front end
 * Salts and hashes the password for safer storage
 * @returns the hash
 */ export function generateHash(password: string) {
	const salt = bcrypt.genSaltSync(12);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}
