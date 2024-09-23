import type { PatternTags } from '../../types';
import { Query } from '../query';

//API calls
const all = (): Promise<PatternTags[]> =>
	Query<PatternTags[]>(`SELECT * FROM tags;`);

export default { all };
