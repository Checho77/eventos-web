import {
  reservasRepository,
  DatosNuevaReserva,
  DatosActualizarReserva,
} from "./reservas.repository";

export class ReservasService {
  async listar(filtros: {
    clienteId?: number | undefined;
    eventoId?: number | undefined;
    estado?: string | undefined;
  }) {
    return reservasRepository.listar(filtros);
  }

  async buscarPorId(id: number) {
    const reserva = await reservasRepository.buscarPorId(id);
    if (!reserva) {
      throw { status: 404, message: "Reserva no encontrada" };
    }
    return reserva;
  }

  async crear(datos: DatosNuevaReserva) {
    if (!datos.clienteId || datos.clienteId <= 0) {
      throw { status: 400, message: "clienteId es obligatorio y debe ser válido" };
    }
    if (!datos.eventoId || datos.eventoId <= 0) {
      throw { status: 400, message: "eventoId es obligatorio y debe ser válido" };
    }
    if (!Number.isInteger(datos.numeroEntradas) || datos.numeroEntradas <= 0) {
      throw { status: 400, message: "El número de entradas debe ser un entero mayor a 0" };
    }

    const evento = await reservasRepository.obtenerEventoParaReserva(datos.eventoId);
    if (!evento) {
      throw { status: 404, message: "El evento seleccionado no existe" };
    }

    if (evento.estado === "Cancelado" || evento.estado === "Finalizado") {
      throw {
        status: 400,
        message: `No se pueden hacer reservas para un evento en estado '${evento.estado}'`,
      };
    }

    const ocupadas = await reservasRepository.totalEntradasReservadasEvento(datos.eventoId);
    const disponibles = evento.capacidad - ocupadas;
    if (datos.numeroEntradas > disponibles) {
      throw {
        status: 400,
        message: `No hay suficientes entradas disponibles. Quedan ${disponibles} entradas.`,
      };
    }

    const precioBase = Number(evento.precioBase);
    const valorTotal = precioBase * datos.numeroEntradas;

    return reservasRepository.crear(datos, valorTotal);
  }

  async actualizar(
    id: number,
    datos: DatosActualizarReserva,
    usuario?: { id: number; rol: string }
  ) {
    const existente = await this.buscarPorId(id);

    // Validación de seguridad por pertenencia
    if (usuario && usuario.rol === "cliente") {
      if (existente.clienteId !== usuario.id) {
        throw {
          status: 403,
          message: "No tienes permiso para modificar la reserva de otro usuario",
        };
      }
      if (datos.estado && datos.estado !== "Cancelada") {
        throw {
          status: 403,
          message: "Los clientes solo pueden solicitar la cancelación de su reserva",
        };
      }
    }

    // Validación de transiciones de estado:
    // Si ya está Cancelada, no se puede reactivar
    if (existente.estado === "Cancelada" && datos.estado && datos.estado !== "Cancelada") {
      throw {
        status: 400,
        message: "Una reserva cancelada no puede reactivarse ni cambiar de estado",
      };
    }

    if (datos.estado && !["Reservada", "Confirmada", "Cancelada"].includes(datos.estado)) {
      throw { status: 400, message: "Estado de reserva inválido" };
    }

    if (datos.estado === "Cancelada") {
      if (!datos.causaCancelacion || datos.causaCancelacion.trim() === "") {
        datos.causaCancelacion =
          usuario?.rol === "cliente"
            ? "Cancelada por solicitud del cliente"
            : "Cancelada por el administrador/agente";
      }
    }

    const actualizada = await reservasRepository.actualizar(id, datos);
    return actualizada;
  }

  async eliminar(id: number, usuario?: { id: number; rol: string }) {
    const existente = await this.buscarPorId(id);

    if (usuario && usuario.rol === "cliente" && existente.clienteId !== usuario.id) {
      throw { status: 403, message: "No tienes permiso para eliminar esta reserva" };
    }

    return reservasRepository.eliminar(id);
  }
}

export const reservasService = new ReservasService();
