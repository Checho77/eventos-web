import { Router } from "express";
import { authController } from "./auth.controller";
import { autenticar, requiereRol } from "../../middlewares/auth.middleware";

export const authRoutes = Router();

// Endpoints públicos de autenticación
authRoutes.post("/registro", (req, res, next) => authController.registro(req, res, next));
authRoutes.post("/login", (req, res, next) => authController.login(req, res, next));

// Perfil del usuario autenticado
authRoutes.get("/me", autenticar, (req, res, next) => authController.me(req, res, next));

// Endpoints CRUD para gestión de Usuarios (solo administrador)
authRoutes.get("/usuarios", autenticar, requiereRol("administrador"), (req, res, next) =>
  authController.getAll(req, res, next)
);
authRoutes.get("/usuarios/:id", autenticar, requiereRol("administrador"), (req, res, next) =>
  authController.getById(req, res, next)
);
authRoutes.put("/usuarios/:id", autenticar, requiereRol("administrador"), (req, res, next) =>
  authController.update(req, res, next)
);
authRoutes.delete("/usuarios/:id", autenticar, requiereRol("administrador"), (req, res, next) =>
  authController.delete(req, res, next)
);
