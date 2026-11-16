import { Router } from "express";
import { localizacionController } from "./localizacion.controller";

export const localizacionRoutes = Router();

// ---------- Países (CRUD completo) ----------
localizacionRoutes.get("/paises", (req, res, next) => localizacionController.getAllPaises(req, res, next));
localizacionRoutes.get("/paises/:id", (req, res, next) => localizacionController.getPaisById(req, res, next));
localizacionRoutes.post("/paises", (req, res, next) => localizacionController.createPais(req, res, next));
localizacionRoutes.put("/paises/:id", (req, res, next) => localizacionController.updatePais(req, res, next));
localizacionRoutes.delete("/paises/:id", (req, res, next) => localizacionController.deletePais(req, res, next));

// ---------- Departamentos (CRUD completo) ----------
localizacionRoutes.get("/departamentos", (req, res, next) => localizacionController.getAllDepartamentos(req, res, next));
localizacionRoutes.get("/paises/:id/departamentos", (req, res, next) => localizacionController.getDepartamentosPorPais(req, res, next));
localizacionRoutes.get("/departamentos/:id", (req, res, next) => localizacionController.getDepartamentoById(req, res, next));
localizacionRoutes.post("/departamentos", (req, res, next) => localizacionController.createDepartamento(req, res, next));
localizacionRoutes.put("/departamentos/:id", (req, res, next) => localizacionController.updateDepartamento(req, res, next));
localizacionRoutes.delete("/departamentos/:id", (req, res, next) => localizacionController.deleteDepartamento(req, res, next));

// ---------- Ciudades (CRUD completo) ----------
localizacionRoutes.get("/ciudades", (req, res, next) => localizacionController.getAllCiudades(req, res, next));
localizacionRoutes.get("/departamentos/:id/ciudades", (req, res, next) => localizacionController.getCiudadesPorDepartamento(req, res, next));
localizacionRoutes.get("/ciudades/:id", (req, res, next) => localizacionController.getCiudadById(req, res, next));
localizacionRoutes.post("/ciudades", (req, res, next) => localizacionController.createCiudad(req, res, next));
localizacionRoutes.put("/ciudades/:id", (req, res, next) => localizacionController.updateCiudad(req, res, next));
localizacionRoutes.delete("/ciudades/:id", (req, res, next) => localizacionController.deleteCiudad(req, res, next));
