import type { Tag } from '../../types';
import { Query } from '../query';

//API calls
const all = (): Promise<Tag[]> => Query<Tag[]>(`SELECT * FROM tags;`);

export default { all };
