import { Router } from "express";
import { reservasController } from "./reservas.controller";

export const reservasRoutes = Router();

// 5 Operaciones CRUD solicitadas por la rúbrica
reservasRoutes.get("/", (req, res, next) => reservasController.getAll(req, res, next));
reservasRoutes.get("/:id", (req, res, next) => reservasController.getById(req, res, next));
reservasRoutes.post("/", (req, res, next) => reservasController.create(req, res, next));
reservasRoutes.put("/:id", (req, res, next) => reservasController.update(req, res, next));
reservasRoutes.delete("/:id", (req, res, next) => reservasController.delete(req, res, next));
