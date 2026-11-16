import { localizacionRepository } from "./localizacion.repository";

export class LocalizacionService {
  // Paises
  async listarPaises() {
    return localizacionRepository.listarPaises();
  }
  async buscarPaisPorId(id: number) {
    const p = await localizacionRepository.buscarPaisPorId(id);
    if (!p) throw { status: 404, message: "País no encontrado" };
    return p;
  }
  async crearPais(nombre: string) {
    if (!nombre || nombre.trim() === "") {
      throw { status: 400, message: "El nombre del país es obligatorio" };
    }
    return localizacionRepository.crearPais(nombre.trim());
  }
  async actualizarPais(id: number, nombre: string) {
    await this.buscarPaisPorId(id);
    if (!nombre || nombre.trim() === "") {
      throw { status: 400, message: "El nombre del país es obligatorio" };
    }
    return localizacionRepository.actualizarPais(id, nombre.trim());
  }
  async eliminarPais(id: number) {
    await this.buscarPaisPorId(id);
    return localizacionRepository.eliminarPais(id);
  }

  // Departamentos
  async listarDepartamentos(paisId?: number) {
    if (paisId) {
      return localizacionRepository.listarDepartamentos(paisId);
    }
    return localizacionRepository.listarTodosDepartamentos();
  }
  async buscarDepartamentoPorId(id: number) {
    const d = await localizacionRepository.buscarDepartamentoPorId(id);
    if (!d) throw { status: 404, message: "Departamento no encontrado" };
    return d;
  }
  async crearDepartamento(nombre: string, paisId: number) {
    if (!nombre || nombre.trim() === "") {
      throw { status: 400, message: "El nombre del departamento es obligatorio" };
    }
    if (!Number.isInteger(paisId) || paisId <= 0) {
      throw { status: 400, message: "paisId es obligatorio y debe ser válido" };
    }
    return localizacionRepository.crearDepartamento(nombre.trim(), paisId);
  }
  async actualizarDepartamento(id: number, nombre: string, paisId: number) {
    await this.buscarDepartamentoPorId(id);
    if (!nombre || nombre.trim() === "") {
      throw { status: 400, message: "El nombre del departamento es obligatorio" };
    }
    if (!Number.isInteger(paisId) || paisId <= 0) {
      throw { status: 400, message: "paisId es obligatorio y debe ser válido" };
    }
    return localizacionRepository.actualizarDepartamento(id, nombre.trim(), paisId);
  }
  async eliminarDepartamento(id: number) {
    await this.buscarDepartamentoPorId(id);
    return localizacionRepository.eliminarDepartamento(id);
  }

  // Ciudades
  async listarCiudades(departamentoId?: number) {
    if (departamentoId) {
      return localizacionRepository.listarCiudades(departamentoId);
    }
    return localizacionRepository.listarTodasCiudades();
  }
  async buscarCiudadPorId(id: number) {
    const c = await localizacionRepository.buscarCiudadPorId(id);
    if (!c) throw { status: 404, message: "Ciudad no encontrada" };
    return c;
  }
  async crearCiudad(nombre: string, departamentoId: number) {
    if (!nombre || nombre.trim() === "") {
      throw { status: 400, message: "El nombre de la ciudad es obligatorio" };
    }
    if (!Number.isInteger(departamentoId) || departamentoId <= 0) {
      throw { status: 400, message: "departamentoId es obligatorio y debe ser válido" };
    }
    return localizacionRepository.crearCiudad(nombre.trim(), departamentoId);
  }
  async actualizarCiudad(id: number, nombre: string, departamentoId: number) {
    await this.buscarCiudadPorId(id);
    if (!nombre || nombre.trim() === "") {
      throw { status: 400, message: "El nombre de la ciudad es obligatorio" };
    }
    if (!Number.isInteger(departamentoId) || departamentoId <= 0) {
      throw { status: 400, message: "departamentoId es obligatorio y debe ser válido" };
    }
    return localizacionRepository.actualizarCiudad(id, nombre.trim(), departamentoId);
  }
  async eliminarCiudad(id: number) {
    await this.buscarCiudadPorId(id);
    return localizacionRepository.eliminarCiudad(id);
  }
}

export const localizacionService = new LocalizacionService();
