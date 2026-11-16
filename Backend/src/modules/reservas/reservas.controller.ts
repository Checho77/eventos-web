import { Request, Response, NextFunction } from "express";
import { reservasService } from "./reservas.service";

export class ReservasController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usuario = (req as any).usuario;
      let clienteId = req.query.clienteId ? Number(req.query.clienteId) : undefined;
      const eventoId = req.query.eventoId ? Number(req.query.eventoId) : undefined;
      const estado = typeof req.query.estado === "string" ? req.query.estado : undefined;

      // Seguridad: Si el rol es cliente, solo puede consultar sus propias reservas
      if (usuario && usuario.rol === "cliente") {
        clienteId = usuario.id;
      }

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
      const usuario = (req as any).usuario;

      // Seguridad: Si es cliente, solo puede ver su propia reserva
      if (usuario && usuario.rol === "cliente" && reserva.clienteId !== usuario.id) {
        res.status(403).json({ error: "No tienes permiso para ver esta reserva" });
        return;
      }

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
      const usuario = (req as any).usuario;

      // Si es cliente autenticado, siempre toma su propio ID del token
      const clienteId =
        usuario?.rol === "cliente" ? usuario.id : Number(req.body.clienteId) || usuario?.id;

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
      const actualizada = await reservasService.actualizar(
        id,
        {
          estado,
          observaciones,
          causaCancelacion,
        },
        (req as any).usuario
      );

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

      await reservasService.eliminar(id, (req as any).usuario);
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
