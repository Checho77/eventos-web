import { app } from "./app";
import { envs } from "./config/envs";
import { pool } from "./config/database";

async function main(): Promise<void> {
  try {
    await pool.query("SELECT 1");
    console.log("Conectado a PostgreSQL");

    app.listen(envs.PORT, () => {
      console.log(`Servidor en http://localhost:${envs.PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
    process.exit(1);
  }
}

main();