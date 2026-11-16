import { eventosRepository, DatosEvento } from "./eventos.repository";

const ESTADOS_VALIDOS = ["Programado", "En Boletería", "En Vivo", "Finalizado", "Cancelado"];

export class EventosService {
  async listar(filtros: { ciudadId?: number | undefined; estado?: string | undefined; agenteId?: number | undefined }) {
    return eventosRepository.listar(filtros);
  }

  async buscarPorId(id: number) {
    const evento = await eventosRepository.buscarPorId(id);
    if (!evento) {
      throw { status: 404, message: "Evento no encontrado" };
    }
    return evento;
  }

  validarDatos(body: any): DatosEvento {
    const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
    const teatro = typeof body.teatro === "string" ? body.teatro.trim() : "";
    const ciudadId = Number(body.ciudadId);
    const capacidad = Number(body.capacidad);
    const precioBase = Number(body.precioBase);
    const estado = typeof body.estado === "string" ? body.estado : "Programado";
    const inicio = Date.parse(body.fechaInicio);
    const fin = Date.parse(body.fechaFin);

    if (!nombre || !teatro) {
      throw { status: 400, message: "El nombre y el teatro son campos obligatorios" };
    }
    if (!Number.isInteger(ciudadId) || ciudadId <= 0) {
      throw { status: 400, message: "ciudadId es obligatorio y debe ser válido" };
    }
    if (Number.isNaN(inicio) || Number.isNaN(fin)) {
      throw { status: 400, message: "fechaInicio y fechaFin deben ser fechas válidas" };
    }
    if (fin < inicio) {
      throw { status: 400, message: "La fecha de fin no puede ser anterior a la fecha de inicio" };
    }
    if (!Number.isInteger(capacidad) || capacidad <= 0) {
      throw { status: 400, message: "La capacidad debe ser un número entero mayor a 0" };
    }
    if (!Number.isFinite(precioBase) || precioBase < 0) {
      throw { status: 400, message: "El precio base no puede ser negativo" };
    }
    if (!ESTADOS_VALIDOS.includes(estado)) {
      throw {
        status: 400,
        message: `El estado debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`,
      };
    }

    let causaCancelacion: string | null = null;
    if (estado === "Cancelado") {
      causaCancelacion =
        typeof body.causaCancelacion === "string" && body.causaCancelacion.trim() !== ""
          ? body.causaCancelacion.trim()
          : "Cancelado por el organizador";
    }

    return {
      nombre,
      descripcion: typeof body.descripcion === "string" ? body.descripcion.trim() : "",
      teatro,
      ciudadId,
      fechaInicio: String(body.fechaInicio),
      fechaFin: String(body.fechaFin),
      capacidad,
      precioBase,
      observaciones: typeof body.observaciones === "string" ? body.observaciones.trim() : "",
      estado,
      causaCancelacion,
    };
  }

  async crear(body: any, agenteId: number) {
    const datos = this.validarDatos(body);
    return eventosRepository.crear(datos, agenteId);
  }

  async actualizar(id: number, body: any, usuario?: { id: number; rol: string }) {
    const existente = await this.buscarPorId(id);

    if (usuario && usuario.rol === "agente" && existente.agenteId !== usuario.id) {
      throw { status: 403, message: "Solo puedes modificar tus propios eventos" };
    }

    const datos = this.validarDatos(body);
    return eventosRepository.actualizar(id, datos);
  }

  async eliminar(id: number, usuario?: { id: number; rol: string }) {
    const existente = await this.buscarPorId(id);

    if (usuario && usuario.rol === "agente" && existente.agenteId !== usuario.id) {
      throw { status: 403, message: "Solo puedes eliminar tus propios eventos" };
    }

    return eventosRepository.eliminar(id);
  }
}

export const eventosService = new EventosService();
