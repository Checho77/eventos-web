import { pool } from "../../config/database";

export interface NuevoCliente {
  identificacion: string;
  nombreCompleto: string;
  correo: string;
  direccion: string;
  ciudadId: number;
  passwordHash: string;
  telefonos: string[];
  rol?: "cliente" | "agente";
  experiencia?: number;
}

export interface ActualizarUsuario {
  nombreCompleto?: string;
  direccion?: string;
  ciudadId?: number;
}

const SELECT_USUARIO_COMPLETO = `
  SELECT p.id,
         p.identificacion,
         p.nombre_completo AS "nombreCompleto",
         p.correo,
         p.direccion,
         p.ciudad_id       AS "ciudadId",
         p.password_hash   AS "passwordHash",
         c_ciu.nombre      AS "ciudadNombre",
         c_dep.nombre      AS "departamentoNombre",
         c_pai.nombre      AS "paisNombre",
         CASE
           WHEN a.persona_id IS NOT NULL THEN 'administrador'
           WHEN g.persona_id IS NOT NULL THEN 'agente'
           WHEN c.persona_id IS NOT NULL THEN 'cliente'
         END AS rol,
         c.puntos,
         c.visualiza_publicidad AS "visualizaPublicidad",
         g.comision,
         g.experiencia,
         a.salario,
         a.horario,
         COALESCE(
           (SELECT json_agg(t.telefono) FROM telefonos t WHERE t.persona_id = p.id),
           '[]'::json
         ) AS telefonos
  FROM personas p
  JOIN ciudades c_ciu       ON c_ciu.id = p.ciudad_id
  JOIN departamentos c_dep  ON c_dep.id = c_ciu.departamento_id
  JOIN paises c_pai         ON c_pai.id = c_dep.pais_id
  LEFT JOIN administradores a ON a.persona_id = p.id
  LEFT JOIN agentes g         ON g.persona_id = p.id
  LEFT JOIN clientes c        ON c.persona_id = p.id
`;

function mapearUsuario(row: any, incluirHash = false) {
  if (!row) return null;
  const user: any = {
    id: row.id,
    identificacion: row.identificacion,
    nombreCompleto: row.nombreCompleto,
    correo: row.correo,
    direccion: row.direccion,
    rol: row.rol,
    telefonos: Array.isArray(row.telefonos) ? row.telefonos : [],
    ciudad: {
      id: row.ciudadId,
      nombre: row.ciudadNombre,
      departamento: row.departamentoNombre,
      pais: row.paisNombre,
    },
    // Propiedades específicas de perfil
    puntos: row.puntos !== null ? Number(row.puntos) : undefined,
    visualizaPublicidad: row.visualizaPublicidad !== null ? Boolean(row.visualizaPublicidad) : undefined,
    comision: row.comision !== null ? Number(row.comision) : undefined,
    experiencia: row.experiencia !== null ? Number(row.experiencia) : undefined,
    salario: row.salario !== null ? Number(row.salario) : undefined,
    horario: row.horario ?? undefined,
  };

  if (incluirHash) {
    user.passwordHash = row.passwordHash;
  }

  return user;
}

export const authRepository = {
  async listar() {
    const { rows } = await pool.query(`${SELECT_USUARIO_COMPLETO} ORDER BY p.id`);
    return rows.map((r) => mapearUsuario(r, false));
  },

  async buscarPorCorreo(correo: string) {
    const { rows } = await pool.query(
      `${SELECT_USUARIO_COMPLETO} WHERE p.correo = $1`,
      [correo]
    );
    return mapearUsuario(rows[0], true);
  },

  async buscarPorId(id: number) {
    const { rows } = await pool.query(
      `${SELECT_USUARIO_COMPLETO} WHERE p.id = $1`,
      [id]
    );
    return mapearUsuario(rows[0], false);
  },

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

      if (datos.rol === "agente") {
        await client.query(
          "INSERT INTO agentes (persona_id, comision, experiencia) VALUES ($1, 8.0, $2)",
          [personaId, datos.experiencia ?? 0]
        );
      } else {
        await client.query("INSERT INTO clientes (persona_id) VALUES ($1)", [personaId]);
      }

      await client.query("COMMIT");
      return personaId;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async actualizar(id: number, datos: ActualizarUsuario) {
    const campos: string[] = [];
    const valores: unknown[] = [];

    if (datos.nombreCompleto) {
      valores.push(datos.nombreCompleto);
      campos.push(`nombre_completo = $${valores.length}`);
    }
    if (datos.direccion) {
      valores.push(datos.direccion);
      campos.push(`direccion = $${valores.length}`);
    }
    if (datos.ciudadId) {
      valores.push(datos.ciudadId);
      campos.push(`ciudad_id = $${valores.length}`);
    }

    if (campos.length === 0) return this.buscarPorId(id);

    valores.push(id);
    const { rowCount } = await pool.query(
      `UPDATE personas SET ${campos.join(", ")} WHERE id = $${valores.length}`,
      valores
    );

    return (rowCount ?? 0) > 0 ? this.buscarPorId(id) : null;
  },

  async eliminar(id: number) {
    const { rowCount } = await pool.query("DELETE FROM personas WHERE id = $1", [id]);
    return (rowCount ?? 0) > 0;
  },
};
