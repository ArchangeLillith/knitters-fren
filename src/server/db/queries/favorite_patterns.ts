import type { FavoriteTable } from '../../types';
import { Query } from '../query';

//API calls
const allByAuthorId = (id: string): Promise<FavoriteTable[]> =>
	Query<FavoriteTable[]>(
		`SELECT * FROM favorite_patterns WHERE author_id = ?;`,
		[id]
	);

export default { allByAuthorId };
