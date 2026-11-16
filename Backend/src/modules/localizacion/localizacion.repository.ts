import { pool } from "../../config/database";

export const localizacionRepository = {
  // ---------- Países ----------
  async listarPaises() {
    const { rows } = await pool.query("SELECT id, nombre FROM paises ORDER BY nombre");
    return rows;
  },
  async crearPais(nombre: string) {
    const { rows } = await pool.query(
      "INSERT INTO paises (nombre) VALUES ($1) RETURNING id, nombre",
      [nombre]
    );
    return rows[0];
  },
  async actualizarPais(id: number, nombre: string) {
    const { rows } = await pool.query(
      "UPDATE paises SET nombre = $1 WHERE id = $2 RETURNING id, nombre",
      [nombre, id]
    );
    return rows[0] ?? null;
  },
  async eliminarPais(id: number) {
    const { rowCount } = await pool.query("DELETE FROM paises WHERE id = $1", [id]);
    return (rowCount ?? 0) > 0;
  },

  // ---------- Departamentos ----------
  async listarDepartamentos(paisId: number) {
    const { rows } = await pool.query(
      `SELECT id, nombre, pais_id AS "paisId"
       FROM departamentos WHERE pais_id = $1 ORDER BY nombre`,
      [paisId]
    );
    return rows;
  },
  async crearDepartamento(nombre: string, paisId: number) {
    const { rows } = await pool.query(
      `INSERT INTO departamentos (nombre, pais_id) VALUES ($1, $2)
       RETURNING id, nombre, pais_id AS "paisId"`,
      [nombre, paisId]
    );
    return rows[0];
  },
  async actualizarDepartamento(id: number, nombre: string, paisId: number) {
    const { rows } = await pool.query(
      `UPDATE departamentos SET nombre = $1, pais_id = $2 WHERE id = $3
       RETURNING id, nombre, pais_id AS "paisId"`,
      [nombre, paisId, id]
    );
    return rows[0] ?? null;
  },
  async eliminarDepartamento(id: number) {
    const { rowCount } = await pool.query("DELETE FROM departamentos WHERE id = $1", [id]);
    return (rowCount ?? 0) > 0;
  },

  // ---------- Ciudades ----------
  async listarCiudades(departamentoId: number) {
    const { rows } = await pool.query(
      `SELECT id, nombre, departamento_id AS "departamentoId"
       FROM ciudades WHERE departamento_id = $1 ORDER BY nombre`,
      [departamentoId]
    );
    return rows;
  },
  async crearCiudad(nombre: string, departamentoId: number) {
    const { rows } = await pool.query(
      `INSERT INTO ciudades (nombre, departamento_id) VALUES ($1, $2)
       RETURNING id, nombre, departamento_id AS "departamentoId"`,
      [nombre, departamentoId]
    );
    return rows[0];
  },
  async actualizarCiudad(id: number, nombre: string, departamentoId: number) {
    const { rows } = await pool.query(
      `UPDATE ciudades SET nombre = $1, departamento_id = $2 WHERE id = $3
       RETURNING id, nombre, departamento_id AS "departamentoId"`,
      [nombre, departamentoId, id]
    );
    return rows[0] ?? null;
  },
  async eliminarCiudad(id: number) {
    const { rowCount } = await pool.query("DELETE FROM ciudades WHERE id = $1", [id]);
    return (rowCount ?? 0) > 0;
  },
};