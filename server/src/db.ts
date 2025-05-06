import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  connectionLimit: 10,
  waitForConnections: true,
});

/* export async function testConnection() {
  try {
    await connection.query("SELECT 1");
    return true;
  } catch (error) {
    console.error("Database connection test failed:", error);
    return false;
  }
} */

export default connection;
