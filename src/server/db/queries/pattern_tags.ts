import type { ResultSetHeader } from 'mysql2';

import type { PatternTag, Tag } from '../../types';
import { Query, QueryMetadata } from '../query';

//get all the pattern tags
const all = (): Promise<PatternTag[]> =>
	Query<PatternTag[]>(/* sql */ `
		SELECT
			*
		FROM
			kf_pattern_tags;
	`);

//GET all tags by the pattern ID
const allByPatternId = (id: string): Promise<Tag[]> =>
	Query<Tag[]>(
		/* sql */ `
			SELECT
				kf_tags.id AS id,
				kf_tags.name AS name
			FROM
				kf_tags JOINkf_ pattern_tags ON tags.id = pattern_tags.tag_id
			WHERE
				kf_pattern_tags.pattern_id = ?
		`,
		[id]
	);

//POST the original tags to the pattern
const insert = (values: [string, number][]): Promise<ResultSetHeader> => {
	// Dynamically create placeholders for however many pairs of numbers are in the array
	const placeholders = values.map(() => `(?, ?)`).join(', ');

	// Flatten the values array, [[1, 2], [3, 4]] becomes [1, 2, 3, 4]
	const flattenedValues = values.flat();

	const sql = /* sql */ `
		INSERT INTO
			kf_pattern_tags (pattern_id, tag_id)
		VALUES
			${placeholders};
	`;

	// Execute the query with the flattened values array
	return QueryMetadata(sql, flattenedValues);
};

//DELETE all tags from one pattern
const destroyAllBasedOnPatternId = (id: string): Promise<ResultSetHeader> =>
	QueryMetadata(/* sql */ 'DELETE FROM kf_pattern_tags WHERE pattern_id = ?', [
		id,
	]);

//PATCH a tag
//This will only be used by the admin side, there's no reason for people to have access to this
//This will only be used for spelling corrections to the tag, the ID is associated with the tag so if the tag goes from A => B, suddenly instead of lace weight you're using ultra chunky for your wedding shawl lol
const update = (values: {
	name: string;
	id: number;
}): Promise<ResultSetHeader> =>
	QueryMetadata(/* sql */ 'UPDATE kf_pattern_tags SET name = ? WHERE id = ?', [
		values.name,
		values.id,
	]);

export default {
	all,
	allByPatternId,
	insert,
	destroyAllBasedOnPatternId,
	update,
};
