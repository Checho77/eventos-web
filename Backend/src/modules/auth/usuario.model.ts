export interface UsuarioModel {
  id: number;
  identificacion: string;
  nombreCompleto: string;
  correo: string;
  direccion: string;
  ciudadId: number;
  rol: "cliente" | "agente" | "administrador";
  telefonos?: string[];
}
