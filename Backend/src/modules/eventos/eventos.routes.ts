import { Router } from "express";
import { eventosController } from "./eventos.controller";

export const eventosRoutes = Router();

// 5 Operaciones CRUD según la rúbrica del proyecto
eventosRoutes.get("/", (req, res, next) => eventosController.getAll(req, res, next));
eventosRoutes.get("/:id", (req, res, next) => eventosController.getById(req, res, next));
eventosRoutes.post("/", (req, res, next) => eventosController.create(req, res, next));
eventosRoutes.put("/:id", (req, res, next) => eventosController.update(req, res, next));
eventosRoutes.delete("/:id", (req, res, next) => eventosController.delete(req, res, next));
