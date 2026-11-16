import { pool } from "../../config/database";

export const reportesRepository = {
  async resumen() {
    const query = `
      SELECT
        (SELECT COUNT(*)::int FROM clientes)        AS clientes,
        (SELECT COUNT(*)::int FROM agentes)         AS agentes,
        (SELECT COUNT(*)::int FROM administradores) AS administradores,
        (SELECT COUNT(*)::int FROM reservas)        AS reservas,
        (SELECT COUNT(*)::int FROM eventos)         AS eventos
    `;
    const { rows } = await pool.query(query);
    return (
      rows[0] ?? {
        clientes: 0,
        agentes: 0,
        administradores: 0,
        reservas: 0,
        eventos: 0,
      }
    );
  },

  async ingresosMensuales() {
    const mesesNombres = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const query = `
      SELECT EXTRACT(MONTH FROM fecha)::int AS mes_num,
             COALESCE(SUM(valor_total), 0)::numeric AS ingresos
      FROM reservas
      WHERE estado != 'Cancelada'
      GROUP BY EXTRACT(MONTH FROM fecha)
      ORDER BY mes_num
    `;
    const { rows } = await pool.query(query);
    return rows.map((r) => ({
      mes: mesesNombres[r.mes_num - 1] ?? `Mes ${r.mes_num}`,
      ingresos: Number(r.ingresos),
    }));
  },

  async promedioPorAgente() {
    const query = `
      SELECT p.nombre_completo AS nombre,
             COALESCE(AVG(r.valor_total), 0)::numeric(12,2) AS promedio
      FROM agentes a
      JOIN personas p ON p.id = a.persona_id
      LEFT JOIN eventos e ON e.agente_id = a.persona_id
      LEFT JOIN reservas r ON r.evento_id = e.id AND r.estado != 'Cancelada'
      GROUP BY p.nombre_completo
      ORDER BY promedio DESC
    `;
    const { rows } = await pool.query(query);
    return rows.map((r) => ({
      nombre: r.nombre,
      promedio: Number(r.promedio),
    }));
  },

  async promedioPorCliente() {
    const query = `
      SELECT p.nombre_completo AS nombre,
             COALESCE(AVG(r.valor_total), 0)::numeric(12,2) AS promedio
      FROM clientes c
      JOIN personas p ON p.id = c.persona_id
      LEFT JOIN reservas r ON r.cliente_id = c.persona_id AND r.estado != 'Cancelada'
      GROUP BY p.nombre_completo
      ORDER BY promedio DESC
    `;
    const { rows } = await pool.query(query);
    return rows.map((r) => ({
      nombre: r.nombre,
      promedio: Number(r.promedio),
    }));
  },

  async reservasPorEventoMes() {
    const mesesNombres = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const query = `
      SELECT e.nombre AS evento,
             EXTRACT(MONTH FROM r.fecha)::int AS mes_num,
             COUNT(r.id)::int AS reservas
      FROM reservas r
      JOIN eventos e ON e.id = r.evento_id
      GROUP BY e.nombre, EXTRACT(MONTH FROM r.fecha)
      ORDER BY e.nombre, mes_num
    `;
    const { rows } = await pool.query(query);
    return rows.map((r) => ({
      evento: r.evento,
      mes: mesesNombres[r.mes_num - 1] ?? `Mes ${r.mes_num}`,
      reservas: Number(r.reservas),
    }));
  },

  async eventosPorAgenteCiudad() {
    const query = `
      SELECT p.nombre_completo AS agente,
             c.nombre AS ciudad,
             COUNT(e.id)::int AS eventos
      FROM eventos e
      JOIN personas p ON p.id = e.agente_id
      JOIN ciudades c ON c.id = e.ciudad_id
      GROUP BY p.nombre_completo, c.nombre
      ORDER BY p.nombre_completo, c.nombre
    `;
    const { rows } = await pool.query(query);
    return rows.map((r) => ({
      agente: r.agente,
      ciudad: r.ciudad,
      eventos: Number(r.eventos),
    }));
  },
};
