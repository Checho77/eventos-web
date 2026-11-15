/**
 * TODO: UBICACIÓN GEOGRÁFICA
 * Para el frontend se maneja la ciudad con su departamento y país
 * en un solo objeto. En la base de datos serán tablas separadas.
 */
export interface Ciudad {
  id: number;
  nombre: string;
  departamento: string;
  pais: string;
}
