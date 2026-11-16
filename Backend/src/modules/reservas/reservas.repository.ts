import { pool } from "../../config/database";

export interface DatosNuevaReserva {
  clienteId: number;
  eventoId: number;
  numeroEntradas: number;
  observaciones?: string;
}

export interface DatosActualizarReserva {
  estado?: string;
  observaciones?: string;
  causaCancelacion?: string | null;
}

const SELECT_RESERVA_COMPLETA = `
  SELECT r.id,
         r.fecha,
         r.valor_total         AS "valorTotal",
         r.numero_entradas     AS "numeroEntradas",
         r.observaciones,
         r.estado,
         r.cliente_id          AS "clienteId",
         r.evento_id           AS "eventoId",
         r.causa_cancelacion   AS "causaCancelacion",
         -- Datos del evento
         e.nombre              AS "eventoNombre",
         e.descripcion         AS "eventoDescripcion",
         e.teatro              AS "eventoTeatro",
         e.fecha_inicio        AS "eventoFechaInicio",
         e.fecha_fin           AS "eventoFechaFin",
         e.capacidad           AS "eventoCapacidad",
         e.precio_base         AS "eventoPrecioBase",
         e.observaciones       AS "eventoObservaciones",
         e.estado              AS "eventoEstado",
         e.agente_id           AS "eventoAgenteId",
         e.causa_cancelacion   AS "eventoCausaCancelacion",
         ec.id                 AS "eventoCiudadId",
         ec.nombre             AS "eventoCiudadNombre",
         ed.nombre             AS "eventoDepartamentoNombre",
         ep.nombre             AS "eventoPaisNombre",
         -- Datos del cliente / persona
         p.identificacion      AS "clienteIdentificacion",
         p.nombre_completo     AS "clienteNombreCompleto",
         p.correo              AS "clienteCorreo",
         p.direccion           AS "clienteDireccion",
         c.puntos              AS "clientePuntos",
         c.visualiza_publicidad AS "clienteVisualizaPublicidad",
         cc.id                 AS "clienteCiudadId",
         cc.nombre             AS "clienteCiudadNombre",
         cd.nombre             AS "clienteDepartamentoNombre",
         cp.nombre             AS "clientePaisNombre",
         COALESCE(
           (SELECT json_agg(t.telefono) FROM telefonos t WHERE t.persona_id = p.id),
           '[]'::json
         ) AS "clienteTelefonos"
  FROM reservas r
  JOIN eventos e         ON e.id = r.evento_id
  JOIN ciudades ec       ON ec.id = e.ciudad_id
  JOIN departamentos ed  ON ed.id = ec.departamento_id
  JOIN paises ep         ON ep.id = ed.pais_id
  JOIN clientes c        ON c.persona_id = r.cliente_id
  JOIN personas p        ON p.id = c.persona_id
  JOIN ciudades cc       ON cc.id = p.ciudad_id
  JOIN departamentos cd  ON cd.id = cc.departamento_id
  JOIN paises cp         ON cp.id = cd.pais_id
`;

function mapearReserva(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    fecha: row.fecha,
    valorTotal: Number(row.valorTotal),
    numeroEntradas: Number(row.numeroEntradas),
    observaciones: row.observaciones ?? "",
    estado: row.estado,
    clienteId: row.clienteId,
    eventoId: row.eventoId,
    causaCancelacion: row.causaCancelacion ?? undefined,
    evento: {
      id: row.eventoId,
      nombre: row.eventoNombre,
      descripcion: row.eventoDescripcion,
      teatro: row.eventoTeatro,
      fechaInicio: row.eventoFechaInicio,
      fechaFin: row.eventoFechaFin,
      capacidad: Number(row.eventoCapacidad),
      precioBase: Number(row.eventoPrecioBase),
      observaciones: row.eventoObservaciones,
      estado: row.eventoEstado,
      agenteId: row.eventoAgenteId,
      causaCancelacion: row.eventoCausaCancelacion ?? undefined,
      ciudad: {
        id: row.eventoCiudadId,
        nombre: row.eventoCiudadNombre,
        departamento: row.eventoDepartamentoNombre,
        pais: row.eventoPaisNombre,
      },
    },
    cliente: {
      id: row.clienteId,
      identificacion: row.clienteIdentificacion,
      nombreCompleto: row.clienteNombreCompleto,
      correo: row.clienteCorreo,
      direccion: row.clienteDireccion,
      puntos: Number(row.clientePuntos ?? 0),
      visualizaPublicidad: Boolean(row.clienteVisualizaPublicidad),
      telefonos: Array.isArray(row.clienteTelefonos) ? row.clienteTelefonos : [],
      ciudad: {
        id: row.clienteCiudadId,
        nombre: row.clienteCiudadNombre,
        departamento: row.clienteDepartamentoNombre,
        pais: row.clientePaisNombre,
      },
    },
  };
}

export const reservasRepository = {
  async listar(filtros: { clienteId?: number | undefined; eventoId?: number | undefined; estado?: string | undefined }) {
    const condiciones: string[] = [];
    const valores: unknown[] = [];

    if (filtros.clienteId) {
      valores.push(filtros.clienteId);
      condiciones.push(`r.cliente_id = $${valores.length}`);
    }
    if (filtros.eventoId) {
      valores.push(filtros.eventoId);
      condiciones.push(`r.evento_id = $${valores.length}`);
    }
    if (filtros.estado) {
      valores.push(filtros.estado);
      condiciones.push(`r.estado = $${valores.length}`);
    }

    const where = condiciones.length ? `WHERE ${condiciones.join(" AND ")}` : "";
    const { rows } = await pool.query(
      `${SELECT_RESERVA_COMPLETA} ${where} ORDER BY r.fecha DESC, r.id DESC`,
      valores
    );
    return rows.map(mapearReserva);
  },

  async buscarPorId(id: number) {
    const { rows } = await pool.query(
      `${SELECT_RESERVA_COMPLETA} WHERE r.id = $1`,
      [id]
    );
    return mapearReserva(rows[0]);
  },

  async crear(datos: DatosNuevaReserva, valorTotal: number) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const { rows } = await client.query(
        `INSERT INTO reservas (fecha, valor_total, numero_entradas, observaciones, estado, cliente_id, evento_id)
         VALUES (NOW(), $1, $2, $3, 'Confirmada', $4, $5)
         RETURNING id`,
        [
          valorTotal,
          datos.numeroEntradas,
          datos.observaciones ?? "",
          datos.clienteId,
          datos.eventoId,
        ]
      );
      const reservaId = rows[0].id;

      // Otorgar puntos de fidelización al cliente (10 puntos por entrada)
      await client.query(
        `UPDATE clientes SET puntos = puntos + $1 WHERE persona_id = $2`,
        [datos.numeroEntradas * 10, datos.clienteId]
      );

      await client.query("COMMIT");
      return this.buscarPorId(reservaId);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async actualizar(id: number, datos: DatosActualizarReserva) {
    const campos: string[] = [];
    const valores: unknown[] = [];

    if (datos.estado !== undefined) {
      valores.push(datos.estado);
      campos.push(`estado = $${valores.length}`);
    }
    if (datos.observaciones !== undefined) {
      valores.push(datos.observaciones);
      campos.push(`observaciones = $${valores.length}`);
    }
    if (datos.causaCancelacion !== undefined) {
      valores.push(datos.causaCancelacion);
      campos.push(`causa_cancelacion = $${valores.length}`);
    }

    if (campos.length === 0) return this.buscarPorId(id);

    valores.push(id);
    const { rowCount } = await pool.query(
      `UPDATE reservas SET ${campos.join(", ")} WHERE id = $${valores.length}`,
      valores
    );

    return (rowCount ?? 0) > 0 ? this.buscarPorId(id) : null;
  },

  async eliminar(id: number) {
    const { rowCount } = await pool.query("DELETE FROM reservas WHERE id = $1", [id]);
    return (rowCount ?? 0) > 0;
  },

  async obtenerEventoParaReserva(eventoId: number) {
    const { rows } = await pool.query(
      `SELECT id, precio_base AS "precioBase", capacidad, estado FROM eventos WHERE id = $1`,
      [eventoId]
    );
    return rows[0] ?? null;
  },

  async totalEntradasReservadasEvento(eventoId: number) {
    const { rows } = await pool.query(
      `SELECT COALESCE(SUM(numero_entradas), 0)::int AS total
       FROM reservas
       WHERE evento_id = $1 AND estado != 'Cancelada'`,
      [eventoId]
    );
    return Number(rows[0]?.total ?? 0);
  },
};
