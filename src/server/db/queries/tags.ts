import { Query } from "../pool";
//API calls
const all = () => Query<string[]>(`SELECT * FROM tags;`);

export default { all };
