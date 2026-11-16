import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { envs } from "./config/envs";
import { swaggerSpec } from "./config/swagger";
import { authRoutes } from "./modules/auth/auth.routes";
import { eventosRoutes } from "./modules/eventos/eventos.routes";
import { reservasRoutes } from "./modules/reservas/reservas.routes";
import { reportesRoutes } from "./modules/reportes/reportes.routes";
import { localizacionRoutes } from "./modules/localizacion/localizacion.routes";
import { perfilesRoutes } from "./modules/perfiles/perfiles.routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(process.cwd(), envs.PUBLIC_PATH)));

// Documentación interactiva con Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true, version: "1.0.0" });
});

// Rutas organizadas por módulo según rúbrica
app.use("/api/auth", authRoutes);
app.use("/api/eventos", eventosRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api", localizacionRoutes);
app.use("/api", perfilesRoutes);

// Manejo de 404 para cualquier ruta inexistente bajo /api
app.all("/api/*", (_req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint de API no encontrado" });
});

// Manejador global de errores
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  if (error?.status && error?.message) {
    return res.status(error.status).json({ error: error.message });
  }
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
