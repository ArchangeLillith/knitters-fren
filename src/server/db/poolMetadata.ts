import mysql from 'mysql2/promise';

import config from '../config';

// Create a pool for metadata queries
const metadataPool = mysql.createPool(config.db);

export default metadataPool;
