import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envs } from "../../config/envs";
import { autenticar } from "../../middlewares/auth.middleware";
import { authRepository } from "./auth.repository";

export const authRoutes = Router();

const ah = (fn: (req: Request, res: Response) => Promise<unknown>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch(next);
  };

const texto = (v: unknown) => (typeof v === "string" && v.trim() !== "" ? v.trim() : null);

authRoutes.post("/registro", ah(async (req, res) => {
  const identificacion = texto(req.body.identificacion);
  const nombreCompleto = texto(req.body.nombreCompleto);
  const correo = texto(req.body.correo)?.toLowerCase() ?? null;
  const direccion = texto(req.body.direccion);
  const ciudadId = Number(req.body.ciudadId);
  const password = typeof req.body.password === "string" ? req.body.password : "";
  const telefonos: string[] = Array.isArray(req.body.telefonos)
    ? req.body.telefonos.map(texto).filter((t: string | null): t is string => t !== null)
    : [];

  if (!identificacion || !nombreCompleto || !correo || !direccion || !Number.isInteger(ciudadId) || ciudadId <= 0) {
    return res.status(400).json({
      error: "identificacion, nombreCompleto, correo, direccion y ciudadId son obligatorios",
    });
  }
  if (!/^\S+@\S+\.\S+$/.test(correo)) {
    return res.status(400).json({ error: "El correo no es válido" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const id = await authRepository.registrarCliente({
    identificacion, nombreCompleto, correo, direccion, ciudadId, passwordHash, telefonos,
  });

  res.status(201).json(await authRepository.buscarPorId(id));
}));

authRoutes.post("/login", ah(async (req, res) => {
  const correo = texto(req.body.correo)?.toLowerCase();
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (!correo || !password) {
    return res.status(400).json({ error: "correo y password son obligatorios" });
  }

  const usuario = await authRepository.buscarPorCorreo(correo);
  const valido = usuario ? await bcrypt.compare(password, usuario.passwordHash) : false;
  if (!usuario || !valido) {
    return res.status(401).json({ error: "Correo o contraseña incorrectos" });
  }

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    envs.JWT_SECRET,
    { expiresIn: envs.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
  );

  res.json({
    token,
    usuario: {
      id: usuario.id,
      nombreCompleto: usuario.nombreCompleto,
      correo: usuario.correo,
      rol: usuario.rol,
    },
  });
}));

authRoutes.get("/me", autenticar, ah(async (req, res) => {
  const usuario = await authRepository.buscarPorId(req.usuario!.id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(usuario);
}));