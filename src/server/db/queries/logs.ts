import type { Log } from '../../types';
import { Query } from '../query';

//API calls
const all = (): Promise<Log[]> =>
	Query<Log[]>(/* sql */ `
		SELECT
			*
		FROM
			kf_activity_logs;
	`);

export default { all };
