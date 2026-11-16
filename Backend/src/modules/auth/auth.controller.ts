import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";

export class AuthController {
  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuarios = await authService.listar();
      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Id de usuario inválido" });
        return;
      }
      const usuario = await authService.buscarPorId(id);
      res.status(200).json(usuario);
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }

  async registro(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuario = await authService.registrar(req.body);
      res.status(201).json(usuario);
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { correo, password } = req.body;
      const respuesta = await authService.login(correo, password);
      res.status(200).json(respuesta);
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = (req as any).usuario?.id;
      if (!id) {
        res.status(401).json({ error: "No autenticado" });
        return;
      }
      const usuario = await authService.buscarPorId(id);
      res.status(200).json(usuario);
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Id de usuario inválido" });
        return;
      }
      const actualizado = await authService.actualizar(id, req.body);
      res.status(200).json(actualizado);
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Id de usuario inválido" });
        return;
      }
      await authService.eliminar(id);
      res.status(204).send();
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
}

export const authController = new AuthController();
