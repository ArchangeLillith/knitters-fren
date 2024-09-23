import type { ResultSetHeader } from 'mysql2';

import baseService from './base';

/**
 * Calls to backend and returns all patterns from database
 * @returns an array of patterns
 */
const getAllPatterns = async () => {
	const patterns = await baseService.get('/api/patterns');
	return patterns;
};

/**
 *
 * Calls to the backend to grab the pattern based on the id passed in
 * @param id - the id of the requested pattern
 * @returns the pattern requested
 */
const getOnePattern = async (id: string) => {
	const Pattern = await baseService.get(`/api/patterns/${id}`);
	return Pattern;
};

/**
 *
 * Calls to the backend and writes a new pattern to the database
 * @param payload - an object with the required parameters to write a pattern into the database
 * @returns the patternId of the newly written pattern
 */
const addNewPattern = async (payload: {
	id: string;
	title: string;
	content: string;
	author_id: string;
	link: string;
	paid: 'true' | 'false';
}) => {
	console.log(`Adding pattern....`);
	const response = await baseService.post('/api/patterns', payload);
	console.log(`response`, response);
	return response.pattern;
};

/**
 * Destorys the pattern based on id, backend also handles the joint table deletion so this is a one stop shop to delete the pattern fully
 * @param id - the patternId to destroy
 */
const destroyPattern = async (id: string) => {
	const result: ResultSetHeader = await baseService.destroy(
		`/api/patterns/${id}`
	);
	console.log(`Result`, result);
	return result;
};

/**
 * Updates data on the pattern based on id, but doesn't change the pattern id
 * @param id - the pattern that's being updated
 * @param payload - the new data to be written to the pattern
 */
const updatePattern = async (
	id: string,
	payload: { id: string; title: string; content: string }
) => {
	await baseService.put(`/api/patterns/${id}`, payload);
};

export default {
	getAllPatterns,
	getOnePattern,
	addNewPattern,
	destroyPattern,
	updatePattern,
};
