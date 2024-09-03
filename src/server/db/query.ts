import mysql, { ResultSetHeader } from "mysql2";
import pool from "./pool";

export const Query = async <T = mysql.RowDataPacket>(
  sql: string,
  values?: any
): Promise<T[]> => {
  try {
    const [results] = await pool.execute(sql, values);
    return results as T[];
  } catch (error) {
    throw error;
  }
};

export const QueryMetadata = async (
  sql: string,
  values?: any
): Promise<ResultSetHeader> => {
  try {
    const [results] = await pool.execute(sql, values);

    // Correct type check to determine if results is ResultSetHeader
    if (!Array.isArray(results) && "affectedRows" in results) {
      return results as ResultSetHeader;
    }

    throw new Error("Unexpected result type from query.");
  } catch (error) {
    throw error;
  }
};
