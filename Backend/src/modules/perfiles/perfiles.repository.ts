import { pool } from "../../config/database";

export const perfilesRepository = {
  // ---------- CLIENTES ----------
  async listarClientes() {
    const { rows } = await pool.query(`
      SELECT c.persona_id AS id, p.nombre_completo AS "nombreCompleto", p.correo,
             p.identificacion, p.direccion, c.puntos, c.visualiza_publicidad AS "visualizaPublicidad",
             ciu.nombre AS ciudad
      FROM clientes c
      JOIN personas p ON p.id = c.persona_id
      JOIN ciudades ciu ON ciu.id = p.ciudad_id
      ORDER BY c.persona_id
    `);
    return rows;
  },

  async buscarClientePorId(id: number) {
    const { rows } = await pool.query(
      `SELECT c.persona_id AS id, p.nombre_completo AS "nombreCompleto", p.correo,
              p.identificacion, p.direccion, c.puntos, c.visualiza_publicidad AS "visualizaPublicidad",
              ciu.nombre AS ciudad
       FROM clientes c
       JOIN personas p ON p.id = c.persona_id
       JOIN ciudades ciu ON ciu.id = p.ciudad_id
       WHERE c.persona_id = $1`,
      [id]
    );
    return rows[0] ?? null;
  },

  async actualizarCliente(id: number, datos: { puntos?: number; visualizaPublicidad?: boolean }) {
    const campos: string[] = [];
    const valores: unknown[] = [];

    if (datos.puntos !== undefined) {
      valores.push(datos.puntos);
      campos.push(`puntos = $${valores.length}`);
    }
    if (datos.visualizaPublicidad !== undefined) {
      valores.push(datos.visualizaPublicidad);
      campos.push(`visualiza_publicidad = $${valores.length}`);
    }

    if (campos.length > 0) {
      valores.push(id);
      await pool.query(
        `UPDATE clientes SET ${campos.join(", ")} WHERE persona_id = $${valores.length}`,
        valores
      );
    }
    return this.buscarClientePorId(id);
  },

  async eliminarCliente(id: number) {
    const { rowCount } = await pool.query("DELETE FROM clientes WHERE persona_id = $1", [id]);
    return (rowCount ?? 0) > 0;
  },

  // ---------- AGENTES ----------
  async listarAgentes() {
    const { rows } = await pool.query(`
      SELECT a.persona_id AS id, p.nombre_completo AS "nombreCompleto", p.correo,
             p.identificacion, p.direccion, a.comision, a.experiencia,
             ciu.nombre AS ciudad
      FROM agentes a
      JOIN personas p ON p.id = a.persona_id
      JOIN ciudades ciu ON ciu.id = p.ciudad_id
      ORDER BY a.persona_id
    `);
    return rows;
  },

  async buscarAgentePorId(id: number) {
    const { rows } = await pool.query(
      `SELECT a.persona_id AS id, p.nombre_completo AS "nombreCompleto", p.correo,
              p.identificacion, p.direccion, a.comision, a.experiencia,
              ciu.nombre AS ciudad
       FROM agentes a
       JOIN personas p ON p.id = a.persona_id
       JOIN ciudades ciu ON ciu.id = p.ciudad_id
       WHERE a.persona_id = $1`,
      [id]
    );
    return rows[0] ?? null;
  },

  async actualizarAgente(id: number, datos: { comision?: number; experiencia?: number }) {
    const campos: string[] = [];
    const valores: unknown[] = [];

    if (datos.comision !== undefined) {
      valores.push(datos.comision);
      campos.push(`comision = $${valores.length}`);
    }
    if (datos.experiencia !== undefined) {
      valores.push(datos.experiencia);
      campos.push(`experiencia = $${valores.length}`);
    }

    if (campos.length > 0) {
      valores.push(id);
      await pool.query(
        `UPDATE agentes SET ${campos.join(", ")} WHERE persona_id = $${valores.length}`,
        valores
      );
    }
    return this.buscarAgentePorId(id);
  },

  async eliminarAgente(id: number) {
    const { rowCount } = await pool.query("DELETE FROM agentes WHERE persona_id = $1", [id]);
    return (rowCount ?? 0) > 0;
  },

  // ---------- ADMINISTRADORES ----------
  async listarAdministradores() {
    const { rows } = await pool.query(`
      SELECT adm.persona_id AS id, p.nombre_completo AS "nombreCompleto", p.correo,
             p.identificacion, p.direccion, adm.salario, adm.horario,
             ciu.nombre AS ciudad
      FROM administradores adm
      JOIN personas p ON p.id = adm.persona_id
      JOIN ciudades ciu ON ciu.id = p.ciudad_id
      ORDER BY adm.persona_id
    `);
    return rows;
  },

  async buscarAdministradorPorId(id: number) {
    const { rows } = await pool.query(
      `SELECT adm.persona_id AS id, p.nombre_completo AS "nombreCompleto", p.correo,
              p.identificacion, p.direccion, adm.salario, adm.horario,
              ciu.nombre AS ciudad
       FROM administradores adm
       JOIN personas p ON p.id = adm.persona_id
       JOIN ciudades ciu ON ciu.id = p.ciudad_id
       WHERE adm.persona_id = $1`,
      [id]
    );
    return rows[0] ?? null;
  },

  async actualizarAdministrador(id: number, datos: { salario?: number; horario?: string }) {
    const campos: string[] = [];
    const valores: unknown[] = [];

    if (datos.salario !== undefined) {
      valores.push(datos.salario);
      campos.push(`salario = $${valores.length}`);
    }
    if (datos.horario !== undefined) {
      valores.push(datos.horario);
      campos.push(`horario = $${valores.length}`);
    }

    if (campos.length > 0) {
      valores.push(id);
      await pool.query(
        `UPDATE administradores SET ${campos.join(", ")} WHERE persona_id = $${valores.length}`,
        valores
      );
    }
    return this.buscarAdministradorPorId(id);
  },

  async eliminarAdministrador(id: number) {
    const { rowCount } = await pool.query("DELETE FROM administradores WHERE persona_id = $1", [
      id,
    ]);
    return (rowCount ?? 0) > 0;
  },
};
