import { Query } from '../db/query';

export async function logActivity(
	userId: string,
	action: string,
	details: string
) {
	Query(
		`INSERT INTO kf_activity_logs (user_id, action, details) VALUES (?, ?, ?)`,
		[userId, action, details]
	);
}
