import { pool } from "../../config/database";

export interface NuevoCliente {
  identificacion: string;
  nombreCompleto: string;
  correo: string;
  direccion: string;
  ciudadId: number;
  passwordHash: string;
  telefonos: string[];
}

export const authRepository = {
  async buscarPorCorreo(correo: string) {
    const { rows } = await pool.query(
      `SELECT p.id,
              p.nombre_completo AS "nombreCompleto",
              p.correo,
              p.password_hash   AS "passwordHash",
              CASE
                WHEN a.persona_id IS NOT NULL THEN 'administrador'
                WHEN g.persona_id IS NOT NULL THEN 'agente'
                WHEN c.persona_id IS NOT NULL THEN 'cliente'
              END AS rol
       FROM personas p
       LEFT JOIN administradores a ON a.persona_id = p.id
       LEFT JOIN agentes g         ON g.persona_id = p.id
       LEFT JOIN clientes c        ON c.persona_id = p.id
       WHERE p.correo = $1`,
      [correo]
    );
    return rows[0] ?? null;
  },

  async buscarPorId(id: number) {
    const { rows } = await pool.query(
      `SELECT p.id,
              p.identificacion,
              p.nombre_completo AS "nombreCompleto",
              p.correo,
              p.direccion,
              p.ciudad_id AS "ciudadId",
              CASE
                WHEN a.persona_id IS NOT NULL THEN 'administrador'
                WHEN g.persona_id IS NOT NULL THEN 'agente'
                WHEN c.persona_id IS NOT NULL THEN 'cliente'
              END AS rol
       FROM personas p
       LEFT JOIN administradores a ON a.persona_id = p.id
       LEFT JOIN agentes g         ON g.persona_id = p.id
       LEFT JOIN clientes c        ON c.persona_id = p.id
       WHERE p.id = $1`,
      [id]
    );
    return rows[0] ?? null;
  },

  // Crea persona + teléfonos + perfil de cliente en una sola transacción
  async registrarCliente(datos: NuevoCliente) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const { rows } = await client.query(
        `INSERT INTO personas
           (identificacion, nombre_completo, correo, direccion, ciudad_id, password_hash)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          datos.identificacion,
          datos.nombreCompleto,
          datos.correo,
          datos.direccion,
          datos.ciudadId,
          datos.passwordHash,
        ]
      );
      const personaId: number = rows[0].id;

      for (const telefono of datos.telefonos) {
        await client.query(
          "INSERT INTO telefonos (persona_id, telefono) VALUES ($1, $2)",
          [personaId, telefono]
        );
      }

      await client.query("INSERT INTO clientes (persona_id) VALUES ($1)", [personaId]);

      await client.query("COMMIT");
      return personaId;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};