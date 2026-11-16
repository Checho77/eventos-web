import { Router } from "express";
import { authController } from "./auth.controller";
import { autenticar } from "../../middlewares/auth.middleware";

export const authRoutes = Router();

// Endpoints de autenticación
authRoutes.post("/registro", (req, res, next) => authController.registro(req, res, next));
authRoutes.post("/login", (req, res, next) => authController.login(req, res, next));
authRoutes.get("/me", autenticar, (req, res, next) => authController.me(req, res, next));

// Endpoints CRUD para la entidad Personas / Usuarios (solicitado por rúbrica)
authRoutes.get("/usuarios", (req, res, next) => authController.getAll(req, res, next));
authRoutes.get("/usuarios/:id", (req, res, next) => authController.getById(req, res, next));
authRoutes.put("/usuarios/:id", (req, res, next) => authController.update(req, res, next));
authRoutes.delete("/usuarios/:id", (req, res, next) => authController.delete(req, res, next));
