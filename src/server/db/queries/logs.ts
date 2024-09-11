import type { Log } from "../../types";
import { Query } from "../query";

//API calls
const all = (): Promise<Log[]> => Query<Log[]>(`SELECT * FROM activity_logs;`);

export default { all };
