import { Router } from "express";
import { reportesController } from "./reportes.controller";
import { autenticar, requiereRol } from "../../middlewares/auth.middleware";

export const reportesRoutes = Router();

// Los reportes son de acceso exclusivo para el rol administrador
reportesRoutes.use(autenticar, requiereRol("administrador"));

reportesRoutes.get("/resumen", (req, res, next) => reportesController.getResumen(req, res, next));
reportesRoutes.get("/ingresos-mensuales", (req, res, next) =>
  reportesController.getIngresosMensuales(req, res, next)
);
reportesRoutes.get("/promedio-agente", (req, res, next) =>
  reportesController.getPromedioPorAgente(req, res, next)
);
reportesRoutes.get("/promedio-cliente", (req, res, next) =>
  reportesController.getPromedioPorCliente(req, res, next)
);
reportesRoutes.get("/reservas-evento-mes", (req, res, next) =>
  reportesController.getReservasPorEventoMes(req, res, next)
);
reportesRoutes.get("/eventos-agente-ciudad", (req, res, next) =>
  reportesController.getEventosPorAgenteCiudad(req, res, next)
);
reportesRoutes.get("/eventos-por-ubicacion", (req, res, next) =>
  reportesController.getEventosPorUbicacion(req, res, next)
);
