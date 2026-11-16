import { Pool, types } from "pg";
import { envs } from "./envs";

// NUMERIC (1700) -> number, para que los precios no lleguen como texto
types.setTypeParser(1700, (value) => parseFloat(value));
// BIGINT / COUNT (20) -> number
types.setTypeParser(20, (value) => parseInt(value, 10));
// TIMESTAMP sin zona (1114) -> "YYYY-MM-DDTHH:mm:ss" (sin conversion de zona horaria)
types.setTypeParser(1114, (value) => value.replace(" ", "T"));

export const pool = new Pool({
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  user: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,

  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (error) => {
  console.error("Error inesperado en el pool de PostgreSQL:", error);
});