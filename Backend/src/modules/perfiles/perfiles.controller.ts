import { Request, Response, NextFunction } from "express";
import { perfilesRepository } from "./perfiles.repository";

export class PerfilesController {
  // Clientes
  async getClientes(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await perfilesRepository.listarClientes());
    } catch (e) {
      next(e);
    }
  }
  async getClienteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const c = await perfilesRepository.buscarClientePorId(Number(req.params.id));
      if (!c) return res.status(404).json({ error: "Cliente no encontrado" }) as any;
      res.json(c);
    } catch (e) {
      next(e);
    }
  }
  async updateCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const c = await perfilesRepository.actualizarCliente(Number(req.params.id), req.body);
      if (!c) return res.status(404).json({ error: "Cliente no encontrado" }) as any;
      res.json(c);
    } catch (e) {
      next(e);
    }
  }
  async deleteCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await perfilesRepository.eliminarCliente(Number(req.params.id));
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  // Agentes
  async getAgentes(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await perfilesRepository.listarAgentes());
    } catch (e) {
      next(e);
    }
  }
  async getAgenteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const a = await perfilesRepository.buscarAgentePorId(Number(req.params.id));
      if (!a) return res.status(404).json({ error: "Agente no encontrado" }) as any;
      res.json(a);
    } catch (e) {
      next(e);
    }
  }
  async updateAgente(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const a = await perfilesRepository.actualizarAgente(Number(req.params.id), req.body);
      if (!a) return res.status(404).json({ error: "Agente no encontrado" }) as any;
      res.json(a);
    } catch (e) {
      next(e);
    }
  }
  async deleteAgente(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await perfilesRepository.eliminarAgente(Number(req.params.id));
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }

  // Administradores
  async getAdministradores(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json(await perfilesRepository.listarAdministradores());
    } catch (e) {
      next(e);
    }
  }
  async getAdministradorById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const adm = await perfilesRepository.buscarAdministradorPorId(Number(req.params.id));
      if (!adm) return res.status(404).json({ error: "Administrador no encontrado" }) as any;
      res.json(adm);
    } catch (e) {
      next(e);
    }
  }
  async updateAdministrador(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const adm = await perfilesRepository.actualizarAdministrador(Number(req.params.id), req.body);
      if (!adm) return res.status(404).json({ error: "Administrador no encontrado" }) as any;
      res.json(adm);
    } catch (e) {
      next(e);
    }
  }
  async deleteAdministrador(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await perfilesRepository.eliminarAdministrador(Number(req.params.id));
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}

export const perfilesController = new PerfilesController();
