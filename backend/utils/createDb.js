const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function createDb() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'cybershield'}\`;`);
  console.log('Database checked/created');
  await connection.end();
}

createDb().catch(console.error);
