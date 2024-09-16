import type { AuthorsTable } from "../../types";
import { Query } from "../query";

//API calls
const findBannedById = (id: string): Promise<AuthorsTable> =>
	Query<AuthorsTable>(`SELECT * FROM banned_authors WHERE id = "${id}";`);

export default { findBannedById };
