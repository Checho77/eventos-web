import { Request, Response, NextFunction } from "express";
import { eventosService } from "./eventos.service";

export class EventosController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ciudadId = req.query.ciudadId ? Number(req.query.ciudadId) : undefined;
      const estado = typeof req.query.estado === "string" ? req.query.estado : undefined;
      const agenteId = req.query.agenteId ? Number(req.query.agenteId) : undefined;

      const eventos = await eventosService.listar({ ciudadId, estado, agenteId });
      res.status(200).json(eventos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Id de evento inválido" });
        return;
      }

      const evento = await eventosService.buscarPorId(id);
      res.status(200).json(evento);
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Se puede tomar del token o del body si se envía agenteId
      const agenteId = (req as any).usuario?.id ?? Number(req.body.agenteId) ?? 4;
      const nuevoEvento = await eventosService.crear(req.body, agenteId);
      res.status(201).json(nuevoEvento);
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
        res.status(400).json({ error: "Id de evento inválido" });
        return;
      }

      const actualizado = await eventosService.actualizar(id, req.body, (req as any).usuario);
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
        res.status(400).json({ error: "Id de evento inválido" });
        return;
      }

      await eventosService.eliminar(id, (req as any).usuario);
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

export const eventosController = new EventosController();
