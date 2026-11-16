import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../config/envs";

export type Rol = "cliente" | "agente" | "administrador";

export interface UsuarioToken {
  id: number;
  rol: Rol;
}

declare global {
  namespace Express {
    interface Request {
      usuario?: UsuarioToken;
    }
  }
}

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Falta el token de autenticación" });
  }

  try {
    const payload = jwt.verify(header.slice(7), envs.JWT_SECRET) as unknown as UsuarioToken;
    req.usuario = { id: payload.id, rol: payload.rol };
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o vencido" });
  }
}

export function requiereRol(...roles: Rol[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario || !roles.includes(req.usuario.rol)) {
      return res.status(403).json({ error: "No tienes permiso para esta acción" });
    }
    next();
  };
}