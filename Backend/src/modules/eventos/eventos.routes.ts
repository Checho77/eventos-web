import { Router } from "express";
import { eventosController } from "./eventos.controller";
import { autenticar, requiereRol } from "../../middlewares/auth.middleware";

export const eventosRoutes = Router();

// Consultar eventos (público para exploración de cartelera)
eventosRoutes.get("/", (req, res, next) => eventosController.getAll(req, res, next));
eventosRoutes.get("/:id", (req, res, next) => eventosController.getById(req, res, next));

// Crear, editar y eliminar eventos (exclusivo para agentes y administradores)
eventosRoutes.post("/", autenticar, requiereRol("agente", "administrador"), (req, res, next) =>
  eventosController.create(req, res, next)
);
eventosRoutes.put("/:id", autenticar, requiereRol("agente", "administrador"), (req, res, next) =>
  eventosController.update(req, res, next)
);
eventosRoutes.delete("/:id", autenticar, requiereRol("agente", "administrador"), (req, res, next) =>
  eventosController.delete(req, res, next)
);
