import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import { localizacionRepository as repo } from "./localizacion.repository";

export const localizacionRoutes = Router();

// Envuelve handlers async para que los errores lleguen al manejador global
const ah = (fn: (req: Request, res: Response) => Promise<unknown>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch(next);
  };

function idParam(req: Request): number | null {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function texto(valor: unknown): string | null {
  return typeof valor === "string" && valor.trim() !== "" ? valor.trim() : null;
}

function entero(valor: unknown): number | null {
  const n = Number(valor);
  return Number.isInteger(n) && n > 0 ? n : null;
}

// ---------- Países ----------
localizacionRoutes.get("/paises", ah(async (_req, res) => {
  res.json(await repo.listarPaises());
}));

localizacionRoutes.post("/paises", ah(async (req, res) => {
  const nombre = texto(req.body.nombre);
  if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });
  res.status(201).json(await repo.crearPais(nombre));
}));

localizacionRoutes.put("/paises/:id", ah(async (req, res) => {
  const id = idParam(req);
  const nombre = texto(req.body.nombre);
  if (!id) return res.status(400).json({ error: "Id inválido" });
  if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });
  const pais = await repo.actualizarPais(id, nombre);
  if (!pais) return res.status(404).json({ error: "País no encontrado" });
  res.json(pais);
}));

localizacionRoutes.delete("/paises/:id", ah(async (req, res) => {
  const id = idParam(req);
  if (!id) return res.status(400).json({ error: "Id inválido" });
  if (!(await repo.eliminarPais(id))) return res.status(404).json({ error: "País no encontrado" });
  res.status(204).send();
}));

// ---------- Departamentos ----------
localizacionRoutes.get("/paises/:id/departamentos", ah(async (req, res) => {
  const id = idParam(req);
  if (!id) return res.status(400).json({ error: "Id inválido" });
  res.json(await repo.listarDepartamentos(id));
}));

localizacionRoutes.post("/departamentos", ah(async (req, res) => {
  const nombre = texto(req.body.nombre);
  const paisId = entero(req.body.paisId);
  if (!nombre || !paisId) return res.status(400).json({ error: "nombre y paisId son obligatorios" });
  res.status(201).json(await repo.crearDepartamento(nombre, paisId));
}));

localizacionRoutes.put("/departamentos/:id", ah(async (req, res) => {
  const id = idParam(req);
  const nombre = texto(req.body.nombre);
  const paisId = entero(req.body.paisId);
  if (!id) return res.status(400).json({ error: "Id inválido" });
  if (!nombre || !paisId) return res.status(400).json({ error: "nombre y paisId son obligatorios" });
  const depto = await repo.actualizarDepartamento(id, nombre, paisId);
  if (!depto) return res.status(404).json({ error: "Departamento no encontrado" });
  res.json(depto);
}));

localizacionRoutes.delete("/departamentos/:id", ah(async (req, res) => {
  const id = idParam(req);
  if (!id) return res.status(400).json({ error: "Id inválido" });
  if (!(await repo.eliminarDepartamento(id))) return res.status(404).json({ error: "Departamento no encontrado" });
  res.status(204).send();
}));

// ---------- Ciudades ----------
localizacionRoutes.get("/departamentos/:id/ciudades", ah(async (req, res) => {
  const id = idParam(req);
  if (!id) return res.status(400).json({ error: "Id inválido" });
  res.json(await repo.listarCiudades(id));
}));

localizacionRoutes.post("/ciudades", ah(async (req, res) => {
  const nombre = texto(req.body.nombre);
  const departamentoId = entero(req.body.departamentoId);
  if (!nombre || !departamentoId) return res.status(400).json({ error: "nombre y departamentoId son obligatorios" });
  res.status(201).json(await repo.crearCiudad(nombre, departamentoId));
}));

localizacionRoutes.put("/ciudades/:id", ah(async (req, res) => {
  const id = idParam(req);
  const nombre = texto(req.body.nombre);
  const departamentoId = entero(req.body.departamentoId);
  if (!id) return res.status(400).json({ error: "Id inválido" });
  if (!nombre || !departamentoId) return res.status(400).json({ error: "nombre y departamentoId son obligatorios" });
  const ciudad = await repo.actualizarCiudad(id, nombre, departamentoId);
  if (!ciudad) return res.status(404).json({ error: "Ciudad no encontrada" });
  res.json(ciudad);
}));

localizacionRoutes.delete("/ciudades/:id", ah(async (req, res) => {
  const id = idParam(req);
  if (!id) return res.status(400).json({ error: "Id inválido" });
  if (!(await repo.eliminarCiudad(id))) return res.status(404).json({ error: "Ciudad no encontrada" });
  res.status(204).send();
}));