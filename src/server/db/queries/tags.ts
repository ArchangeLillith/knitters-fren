import { Query } from "../query";

//API calls
const all = () => Query<string[]>(`SELECT * FROM tags;`);

export default { all };