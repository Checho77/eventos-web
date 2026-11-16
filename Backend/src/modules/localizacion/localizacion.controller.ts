import { Request, Response, NextFunction } from "express";
import { localizacionService } from "./localizacion.service";

export class LocalizacionController {
  // Paises
  async getAllPaises(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(await localizacionService.listarPaises());
    } catch (error) {
      next(error);
    }
  }
  async getPaisById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      res.status(200).json(await localizacionService.buscarPaisPorId(id));
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
  async createPais(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(201).json(await localizacionService.crearPais(req.body.nombre));
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
  async updatePais(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      res.status(200).json(await localizacionService.actualizarPais(id, req.body.nombre));
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
  async deletePais(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await localizacionService.eliminarPais(id);
      res.status(204).send();
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }

  // Departamentos
  async getAllDepartamentos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paisId = req.query.paisId ? Number(req.query.paisId) : undefined;
      res.status(200).json(await localizacionService.listarDepartamentos(paisId));
    } catch (error) {
      next(error);
    }
  }
  async getDepartamentosPorPais(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paisId = Number(req.params.id);
      res.status(200).json(await localizacionService.listarDepartamentos(paisId));
    } catch (error) {
      next(error);
    }
  }
  async getDepartamentoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      res.status(200).json(await localizacionService.buscarDepartamentoPorId(id));
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
  async createDepartamento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nombre, paisId } = req.body;
      res.status(201).json(await localizacionService.crearDepartamento(nombre, Number(paisId)));
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
  async updateDepartamento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { nombre, paisId } = req.body;
      res
        .status(200)
        .json(await localizacionService.actualizarDepartamento(id, nombre, Number(paisId)));
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
  async deleteDepartamento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await localizacionService.eliminarDepartamento(id);
      res.status(204).send();
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }

  // Ciudades
  async getAllCiudades(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const departamentoId = req.query.departamentoId ? Number(req.query.departamentoId) : undefined;
      res.status(200).json(await localizacionService.listarCiudades(departamentoId));
    } catch (error) {
      next(error);
    }
  }
  async getCiudadesPorDepartamento(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const departamentoId = Number(req.params.id);
      res.status(200).json(await localizacionService.listarCiudades(departamentoId));
    } catch (error) {
      next(error);
    }
  }
  async getCiudadById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      res.status(200).json(await localizacionService.buscarCiudadPorId(id));
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
  async createCiudad(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nombre, departamentoId } = req.body;
      res
        .status(201)
        .json(await localizacionService.crearCiudad(nombre, Number(departamentoId)));
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
  async updateCiudad(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { nombre, departamentoId } = req.body;
      res
        .status(200)
        .json(await localizacionService.actualizarCiudad(id, nombre, Number(departamentoId)));
    } catch (error: any) {
      if (error?.status) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      next(error);
    }
  }
  async deleteCiudad(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      await localizacionService.eliminarCiudad(id);
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

export const localizacionController = new LocalizacionController();
