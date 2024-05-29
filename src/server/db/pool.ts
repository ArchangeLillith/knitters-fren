import mysql from "mysql";
import config from "../config";
const pool = mysql.createPool(config.db);


export const Query = <T = mysql.OkPacket>(sql: string, values?: any) => {
	return new Promise<T>((res, rej) => {
		const formatted = mysql.format(sql, values);
		pool.query(formatted, (err, result) => {
			if (err) {
				return rej(err);
			}
			return res(result);
		});
	});
};

