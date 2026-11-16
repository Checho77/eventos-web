import { pool } from "../../config/database";

export const localizacionRepository = {
  // ---------- Países ----------
  async listarPaises() {
    const { rows } = await pool.query("SELECT id, nombre FROM paises ORDER BY nombre");
    return rows;
  },
  async buscarPaisPorId(id: number) {
    const { rows } = await pool.query("SELECT id, nombre FROM paises WHERE id = $1", [id]);
    return rows[0] ?? null;
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
  async listarTodosDepartamentos() {
    const { rows } = await pool.query(
      `SELECT d.id, d.nombre, d.pais_id AS "paisId", p.nombre AS "paisNombre"
       FROM departamentos d
       JOIN paises p ON p.id = d.pais_id
       ORDER BY d.nombre`
    );
    return rows;
  },
  async listarDepartamentos(paisId: number) {
    const { rows } = await pool.query(
      `SELECT id, nombre, pais_id AS "paisId"
       FROM departamentos WHERE pais_id = $1 ORDER BY nombre`,
      [paisId]
    );
    return rows;
  },
  async buscarDepartamentoPorId(id: number) {
    const { rows } = await pool.query(
      `SELECT d.id, d.nombre, d.pais_id AS "paisId", p.nombre AS "paisNombre"
       FROM departamentos d
       JOIN paises p ON p.id = d.pais_id
       WHERE d.id = $1`,
      [id]
    );
    return rows[0] ?? null;
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
  async listarTodasCiudades() {
    const { rows } = await pool.query(
      `SELECT c.id, c.nombre, d.nombre AS departamento, p.nombre AS pais,
              c.departamento_id AS "departamentoId"
       FROM ciudades c
       JOIN departamentos d ON d.id = c.departamento_id
       JOIN paises p        ON p.id = d.pais_id
       ORDER BY c.nombre`
    );
    return rows;
  },
  async listarCiudades(departamentoId: number) {
    const { rows } = await pool.query(
      `SELECT c.id, c.nombre, d.nombre AS departamento, p.nombre AS pais,
              c.departamento_id AS "departamentoId"
       FROM ciudades c
       JOIN departamentos d ON d.id = c.departamento_id
       JOIN paises p        ON p.id = d.pais_id
       WHERE c.departamento_id = $1
       ORDER BY c.nombre`,
      [departamentoId]
    );
    return rows;
  },
  async buscarCiudadPorId(id: number) {
    const { rows } = await pool.query(
      `SELECT c.id, c.nombre, d.nombre AS departamento, p.nombre AS pais,
              c.departamento_id AS "departamentoId"
       FROM ciudades c
       JOIN departamentos d ON d.id = c.departamento_id
       JOIN paises p        ON p.id = d.pais_id
       WHERE c.id = $1`,
      [id]
    );
    return rows[0] ?? null;
  },
  async crearCiudad(nombre: string, departamentoId: number) {
    const { rows } = await pool.query(
      `INSERT INTO ciudades (nombre, departamento_id) VALUES ($1, $2)
       RETURNING id, nombre, departamento_id AS "departamentoId"`,
      [nombre, departamentoId]
    );
    return this.buscarCiudadPorId(rows[0].id);
  },
  async actualizarCiudad(id: number, nombre: string, departamentoId: number) {
    const { rowCount } = await pool.query(
      `UPDATE ciudades SET nombre = $1, departamento_id = $2 WHERE id = $3`,
      [nombre, departamentoId, id]
    );
    return (rowCount ?? 0) > 0 ? this.buscarCiudadPorId(id) : null;
  },
  async eliminarCiudad(id: number) {
    const { rowCount } = await pool.query("DELETE FROM ciudades WHERE id = $1", [id]);
    return (rowCount ?? 0) > 0;
  },
};
