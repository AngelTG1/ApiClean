import dotenv from "dotenv";
import mysql, { RowDataPacket } from "mysql2/promise";
import { Signale } from "signale";

dotenv.config();
const signale = new Signale();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE, 
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
};

const pool = mysql.createPool(config);

export async function query(sql: string, params: any[]): Promise<RowDataPacket[]> {
  try {
    const conn = await pool.getConnection();
    signale.success("Conexión exitosa a la BD");
    const [rows] = await conn.execute<RowDataPacket[]>(sql, params);
    conn.release();
    return rows;
  } catch (error) {
    signale.error(error);
    throw error;
  }
}
