import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envs } from "../../config/envs";
import { authRepository, NuevoCliente, ActualizarUsuario } from "./auth.repository";

export class AuthService {
  async listar() {
    const usuarios = await authRepository.listar();
    return usuarios.map(({ passwordHash, ...u }: any) => u);
  }

  async buscarPorId(id: number) {
    const usuario = await authRepository.buscarPorId(id);
    if (!usuario) {
      throw { status: 404, message: "Usuario no encontrado" };
    }
    const { passwordHash, ...sinPassword } = usuario;
    return sinPassword;
  }

  async registrar(body: any) {
    const identificacion = typeof body.identificacion === "string" ? body.identificacion.trim() : "";
    const nombreCompleto = typeof body.nombreCompleto === "string" ? body.nombreCompleto.trim() : "";
    const correo = typeof body.correo === "string" ? body.correo.trim().toLowerCase() : "";
    const direccion = typeof body.direccion === "string" ? body.direccion.trim() : "";
    const ciudadId = Number(body.ciudadId);
    const password = typeof body.password === "string" ? body.password : "";
    const telefonos: string[] = Array.isArray(body.telefonos)
      ? body.telefonos.filter((t: unknown) => typeof t === "string" && t.trim() !== "")
      : [];

    if (!identificacion || !nombreCompleto || !correo || !direccion || !Number.isInteger(ciudadId) || ciudadId <= 0) {
      throw {
        status: 400,
        message: "identificacion, nombreCompleto, correo, direccion y ciudadId son obligatorios",
      };
    }
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      throw { status: 400, message: "El formato de correo electrónico no es válido" };
    }
    if (password.length < 6) {
      throw { status: 400, message: "La contraseña debe tener al menos 6 caracteres" };
    }

    const rol =
      body.rol === "agente" || body.tipo === "Agente" || body.tipo === "agente"
        ? "agente"
        : "cliente";
    const experiencia = Number(body.experiencia) || 0;

    const passwordHash = await bcrypt.hash(password, 10);
    const id = await authRepository.registrarCliente({
      identificacion,
      nombreCompleto,
      correo,
      direccion,
      ciudadId,
      passwordHash,
      telefonos,
      rol,
      experiencia,
    });

    return this.buscarPorId(id);
  }

  async login(correoRaw: string, passwordRaw: string) {
    const correo = typeof correoRaw === "string" ? correoRaw.trim().toLowerCase() : "";
    const password = typeof passwordRaw === "string" ? passwordRaw : "";

    if (!correo || !password) {
      throw { status: 400, message: "correo y password son obligatorios" };
    }

    const usuario = await authRepository.buscarPorCorreo(correo);
    const valido = usuario ? await bcrypt.compare(password, usuario.passwordHash) : false;
    if (!usuario || !valido) {
      throw { status: 401, message: "Correo o contraseña incorrectos" };
    }

    const token = (jwt.sign as any)(
      { id: usuario.id, rol: usuario.rol },
      envs.JWT_SECRET,
      { expiresIn: envs.JWT_EXPIRES_IN }
    );

    const { passwordHash, ...usuarioPublico } = usuario;

    return {
      token,
      usuario: usuarioPublico,
    };
  }

  async actualizar(id: number, datos: ActualizarUsuario) {
    await this.buscarPorId(id);
    const actualizado = await authRepository.actualizar(id, datos);
    if (!actualizado) throw { status: 404, message: "Usuario no encontrado" };
    const { passwordHash, ...sinPassword } = actualizado;
    return sinPassword;
  }

  async eliminar(id: number) {
    await this.buscarPorId(id);
    return authRepository.eliminar(id);
  }
}

export const authService = new AuthService();
