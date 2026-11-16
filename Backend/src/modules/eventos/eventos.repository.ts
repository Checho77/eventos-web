import { pool } from "../../config/database";

export interface DatosEvento {
  nombre: string;
  descripcion: string;
  teatro: string;
  ciudadId: number;
  fechaInicio: string;
  fechaFin: string;
  capacidad: number;
  precioBase: number;
  observaciones: string;
  estado: string;
  causaCancelacion: string | null;
}

const SELECT_EVENTO = `
  SELECT e.id,
         e.nombre,
         e.descripcion,
         e.teatro,
         e.ciudad_id          AS "ciudadId",
         c.nombre             AS "ciudadNombre",
         d.nombre             AS "departamentoNombre",
         p.nombre             AS "paisNombre",
         e.fecha_inicio       AS "fechaInicio",
         e.fecha_fin          AS "fechaFin",
         e.capacidad,
         e.precio_base        AS "precioBase",
         e.observaciones,
         e.estado,
         e.agente_id          AS "agenteId",
         per.nombre_completo  AS agente,
         e.causa_cancelacion  AS "causaCancelacion"
  FROM eventos e
  JOIN ciudades c        ON c.id = e.ciudad_id
  JOIN departamentos d   ON d.id = c.departamento_id
  JOIN paises p          ON p.id = d.pais_id
  JOIN personas per      ON per.id = e.agente_id
`;

function mapearEvento(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    nombre: row.nombre,
    descripcion: row.descripcion ?? "",
    teatro: row.teatro,
    fechaInicio: row.fechaInicio,
    fechaFin: row.fechaFin,
    capacidad: Number(row.capacidad),
    precioBase: Number(row.precioBase),
    observaciones: row.observaciones ?? "",
    estado: row.estado,
    agenteId: row.agenteId,
    agente: row.agente,
    causaCancelacion: row.causaCancelacion ?? undefined,
    ciudad: {
      id: row.ciudadId,
      nombre: row.ciudadNombre,
      departamento: row.departamentoNombre,
      pais: row.paisNombre,
    },
  };
}

export const eventosRepository = {
  async listar(filtros: { ciudadId?: number | undefined; estado?: string | undefined; agenteId?: number | undefined }) {
    const condiciones: string[] = [];
    const valores: unknown[] = [];

    if (filtros.ciudadId) {
      valores.push(filtros.ciudadId);
      condiciones.push(`e.ciudad_id = $${valores.length}`);
    }
    if (filtros.estado) {
      valores.push(filtros.estado);
      condiciones.push(`e.estado = $${valores.length}`);
    }
    if (filtros.agenteId) {
      valores.push(filtros.agenteId);
      condiciones.push(`e.agente_id = $${valores.length}`);
    }

    const where = condiciones.length ? `WHERE ${condiciones.join(" AND ")}` : "";
    const { rows } = await pool.query(
      `${SELECT_EVENTO} ${where} ORDER BY e.fecha_inicio DESC`,
      valores
    );
    return rows.map(mapearEvento);
  },

  async buscarPorId(id: number) {
    const { rows } = await pool.query(`${SELECT_EVENTO} WHERE e.id = $1`, [id]);
    return mapearEvento(rows[0]);
  },

  async crear(d: DatosEvento, agenteId: number) {
    const { rows } = await pool.query(
      `INSERT INTO eventos
         (nombre, descripcion, teatro, ciudad_id, fecha_inicio, fecha_fin,
          capacidad, precio_base, observaciones, estado, agente_id, causa_cancelacion)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING id`,
      [
        d.nombre,
        d.descripcion,
        d.teatro,
        d.ciudadId,
        d.fechaInicio,
        d.fechaFin,
        d.capacidad,
        d.precioBase,
        d.observaciones,
        d.estado,
        agenteId,
        d.causaCancelacion,
      ]
    );
    return this.buscarPorId(rows[0].id);
  },

  async actualizar(id: number, d: DatosEvento) {
    const { rowCount } = await pool.query(
      `UPDATE eventos SET
         nombre = $1, descripcion = $2, teatro = $3, ciudad_id = $4,
         fecha_inicio = $5, fecha_fin = $6, capacidad = $7, precio_base = $8,
         observaciones = $9, estado = $10, causa_cancelacion = $11
       WHERE id = $12`,
      [
        d.nombre,
        d.descripcion,
        d.teatro,
        d.ciudadId,
        d.fechaInicio,
        d.fechaFin,
        d.capacidad,
        d.precioBase,
        d.observaciones,
        d.estado,
        d.causaCancelacion,
        id,
      ]
    );
    return (rowCount ?? 0) > 0 ? this.buscarPorId(id) : null;
  },

  async eliminar(id: number) {
    const { rowCount } = await pool.query("DELETE FROM eventos WHERE id = $1", [id]);
    return (rowCount ?? 0) > 0;
  },
};
