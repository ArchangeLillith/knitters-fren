import mysql from 'mysql2/promise';

import config from '../config';

// Create a pool for general queries
const pool = mysql.createPool(config.db);

export default pool;
