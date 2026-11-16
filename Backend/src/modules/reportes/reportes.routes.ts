import { Router } from "express";
import { reportesController } from "./reportes.controller";

export const reportesRoutes = Router();

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
