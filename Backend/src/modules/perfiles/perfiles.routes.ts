import { Router } from "express";
import { perfilesController } from "./perfiles.controller";
import { autenticar, requiereRol } from "../../middlewares/auth.middleware";

export const perfilesRoutes = Router();

perfilesRoutes.use(autenticar, requiereRol("administrador"));

// Clientes
perfilesRoutes.get("/clientes", (req, res, next) => perfilesController.getClientes(req, res, next));
perfilesRoutes.get("/clientes/:id", (req, res, next) => perfilesController.getClienteById(req, res, next));
perfilesRoutes.put("/clientes/:id", (req, res, next) => perfilesController.updateCliente(req, res, next));
perfilesRoutes.delete("/clientes/:id", (req, res, next) => perfilesController.deleteCliente(req, res, next));

// Agentes
perfilesRoutes.get("/agentes", (req, res, next) => perfilesController.getAgentes(req, res, next));
perfilesRoutes.get("/agentes/:id", (req, res, next) => perfilesController.getAgenteById(req, res, next));
perfilesRoutes.put("/agentes/:id", (req, res, next) => perfilesController.updateAgente(req, res, next));
perfilesRoutes.delete("/agentes/:id", (req, res, next) => perfilesController.deleteAgente(req, res, next));

// Administradores
perfilesRoutes.get("/administradores", (req, res, next) => perfilesController.getAdministradores(req, res, next));
perfilesRoutes.get("/administradores/:id", (req, res, next) => perfilesController.getAdministradorById(req, res, next));
perfilesRoutes.put("/administradores/:id", (req, res, next) => perfilesController.updateAdministrador(req, res, next));
perfilesRoutes.delete("/administradores/:id", (req, res, next) => perfilesController.deleteAdministrador(req, res, next));
