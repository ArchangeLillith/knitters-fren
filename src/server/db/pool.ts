import mysql from "mysql2";
import config from "../config";
const pool = mysql.createPool(config.db);

export const Query = <T = mysql.ResultSetHeader>(sql: string, values?: any) => {
	return new Promise<T>((res, rej) => {
		const formatted = mysql.format(sql, values);
		pool.query(formatted, (err, result) => {
			if (err) {
				return rej(err);
			}
			//Refactor this typing lol
			return res(result as any);
		});
	});
};
