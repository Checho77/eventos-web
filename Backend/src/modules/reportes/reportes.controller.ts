import { Request, Response, NextFunction } from "express";
import { reportesService } from "./reportes.service";

export class ReportesController {
  async getResumen(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await reportesService.obtenerResumen();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getIngresosMensuales(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await reportesService.obtenerIngresosMensuales();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getPromedioPorAgente(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await reportesService.obtenerPromedioPorAgente();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getPromedioPorCliente(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await reportesService.obtenerPromedioPorCliente();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getReservasPorEventoMes(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await reportesService.obtenerReservasPorEventoMes();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getEventosPorAgenteCiudad(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await reportesService.obtenerEventosPorAgenteCiudad();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export const reportesController = new ReportesController();
