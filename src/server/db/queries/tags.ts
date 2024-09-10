import type { IPatternTags } from "../../types";
import { Query } from "../query";

//API calls
const all = (): Promise<IPatternTags[]> =>
	Query<IPatternTags[]>(`SELECT * FROM tags;`);

export default { all };
