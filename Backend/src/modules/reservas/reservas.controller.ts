import { Request, Response, NextFunction } from "express";
import { reservasService } from "./reservas.service";

export class ReservasController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const clienteId = req.query.clienteId ? Number(req.query.clienteId) : undefined;
      const eventoId = req.query.eventoId ? Number(req.query.eventoId) : undefined;
      const estado = typeof req.query.estado === "string" ? req.query.estado : undefined;

      const reservas = await reservasService.listar({ clienteId, eventoId, estado });
      res.status(200).json(reservas);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Id de reserva inválido" });
        return;
      }

      const reserva = await reservasService.buscarPorId(id);
      res.status(200).json(reserva);
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
      const { eventoId, numeroEntradas, observaciones } = req.body;
      // Si el usuario está autenticado por token, usamos su id; si viene en el body, lo tomamos del body
      const clienteId = (req as any).usuario?.id ?? Number(req.body.clienteId);

      const nuevaReserva = await reservasService.crear({
        clienteId,
        eventoId: Number(eventoId),
        numeroEntradas: Number(numeroEntradas),
        observaciones: typeof observaciones === "string" ? observaciones.trim() : "",
      });

      res.status(201).json(nuevaReserva);
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
        res.status(400).json({ error: "Id de reserva inválido" });
        return;
      }

      const { estado, observaciones, causaCancelacion } = req.body;
      const actualizada = await reservasService.actualizar(id, {
        estado,
        observaciones,
        causaCancelacion,
      });

      res.status(200).json(actualizada);
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
        res.status(400).json({ error: "Id de reserva inválido" });
        return;
      }

      await reservasService.eliminar(id);
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

export const reservasController = new ReservasController();
