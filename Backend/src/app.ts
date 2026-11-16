import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { envs } from "./config/envs";
import { localizacionRoutes } from "./modules/localizacion/localizacion.routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(process.cwd(), envs.PUBLIC_PATH)));

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.use("/api", localizacionRoutes);

// Manejador de errores (siempre al final)
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  if (error?.code === "23505") {
    return res.status(409).json({ error: "Ya existe un registro con esos datos" });
  }
  if (error?.code === "23503") {
    return res.status(409).json({
      error: "La referencia no existe o el registro tiene datos relacionados",
    });
  }
  console.error(error);
  res.status(500).json({ error: "Error interno del servidor" });
});