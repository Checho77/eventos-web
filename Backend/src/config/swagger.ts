export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "EventosApp API REST",
    version: "1.0.0",
    description: "API REST para el Proyecto Integrador - Bases de Datos y Web 1 (UCEVA)",
  },
  servers: [{ url: "http://localhost:3000/api", description: "Servidor local de desarrollo" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/health": {
      get: {
        summary: "Verificar estado del servidor",
        responses: { "200": { description: "Servidor en línea" } },
      },
    },
    "/auth/login": {
      post: {
        summary: "Iniciar sesión",
        description: "Autentica al usuario y devuelve el token JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  correo: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "Login exitoso" }, "401": { description: "Credenciales inválidas" } },
      },
    },
    "/auth/registro": {
      post: {
        summary: "Registrar cliente o agente",
        responses: { "201": { description: "Usuario registrado" } },
      },
    },
    "/eventos": {
      get: { summary: "Listar eventos activos o filtrados" },
      post: {
        summary: "Crear nuevo evento (Agente / Admin)",
        security: [{ bearerAuth: [] }],
      },
    },
    "/reservas": {
      get: {
        summary: "Listar reservas",
        security: [{ bearerAuth: [] }],
      },
      post: {
        summary: "Crear una nueva reserva (Cliente)",
        security: [{ bearerAuth: [] }],
      },
    },
    "/reportes/resumen": {
      get: {
        summary: "Resumen del sistema para administradores",
        security: [{ bearerAuth: [] }],
      },
    },
  },
};
