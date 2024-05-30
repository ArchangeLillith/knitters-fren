import { Query } from "../pool";

const deleteTagsByPatternId = (id: string) => {
	Query("DELETE FROM pattern_tags WHERE pattern_id = ?;", [id]);
};

export default { deleteTagsByPatternId };
