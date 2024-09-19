import { PatternComment } from "../utils/types";
import baseService from "./base";

/**
 * Gets all the comments for the pattern id passed in
 * @param id - the id of the pattern we want the comments for
 * @returns an array of comments
 */
const getAllComments = async () => {
	try {
		const comments: PatternComment[] = await baseService.get(
			`/api/comments/`
		);
		return comments;
	} catch (error) {
		throw error;
	}
};

/**
 * Gets all the comments for the pattern id passed in
 * @param id - the id of the pattern we want the comments for
 * @returns an array of comments
 */
const getAllCommentsByPattern = async (patternId: string) => {
	try {
		const comments: PatternComment[] = await baseService.get(
			`/api/comments/${patternId}`
		);
		return comments;
	} catch (error) {
		throw error;
	}
};

/**
 *
 * Adds the tags to the pattern_tags joint table based on the id in the paramater object
 * @param payload - an object of the patternId and an array of patterns that need to be added to the pattern_tags joint table
 * @returns the pattern (I think)
 */
const addNewComment = async (
	pattern_id: string,
	author_id: string,
	content: string
) => {
	const payload = {
		pattern_id,
		author_id,
		content,
	};
	try {
		console.log(`Adding comment to joint table....`);
		const response = await baseService.post(
			`/api/comments/${payload.pattern_id}`,
			payload
		);
		return response;
	} catch (error) {
		console.error(
			`comment no added correctly, catch in addnewcomment, error is:`,
			error
		);
		throw error;
	}
};

export default {
	getAllComments,
	getAllCommentsByPattern,
	addNewComment,
};
