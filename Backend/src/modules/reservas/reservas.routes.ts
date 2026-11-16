import { Router } from "express";
import { reservasController } from "./reservas.controller";
import { autenticar, requiereRol } from "../../middlewares/auth.middleware";

export const reservasRoutes = Router();

// Todas las operaciones sobre reservas requieren autenticación
reservasRoutes.use(autenticar);

reservasRoutes.get("/", (req, res, next) => reservasController.getAll(req, res, next));
reservasRoutes.get("/:id", (req, res, next) => reservasController.getById(req, res, next));
reservasRoutes.post("/", requiereRol("cliente", "administrador"), (req, res, next) =>
  reservasController.create(req, res, next)
);
reservasRoutes.put("/:id", (req, res, next) => reservasController.update(req, res, next));
reservasRoutes.delete("/:id", requiereRol("administrador", "agente"), (req, res, next) =>
  reservasController.delete(req, res, next)
);
