import { reportesRepository } from "./reportes.repository";

export class ReportesService {
  async obtenerResumen() {
    return reportesRepository.resumen();
  }

  async obtenerIngresosMensuales() {
    return reportesRepository.ingresosMensuales();
  }

  async obtenerPromedioPorAgente() {
    return reportesRepository.promedioPorAgente();
  }

  async obtenerPromedioPorCliente() {
    return reportesRepository.promedioPorCliente();
  }

  async obtenerReservasPorEventoMes() {
    return reportesRepository.reservasPorEventoMes();
  }

  async obtenerEventosPorAgenteCiudad() {
    return reportesRepository.eventosPorAgenteCiudad();
  }

  async obtenerEventosPorUbicacion() {
    return reportesRepository.eventosPorUbicacion();
  }
}

export const reportesService = new ReportesService();
