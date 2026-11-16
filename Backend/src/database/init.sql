-- =====================================================================
-- EventosApp - Esquema de base de datos (PostgreSQL)
-- Ejecutar con: npm run db:init   (borra y recrea todas las tablas)
-- =====================================================================

DROP TABLE IF EXISTS reservas        CASCADE;
DROP TABLE IF EXISTS eventos         CASCADE;
DROP TABLE IF EXISTS telefonos       CASCADE;
DROP TABLE IF EXISTS administradores CASCADE;
DROP TABLE IF EXISTS agentes         CASCADE;
DROP TABLE IF EXISTS clientes        CASCADE;
DROP TABLE IF EXISTS personas        CASCADE;
DROP TABLE IF EXISTS ciudades        CASCADE;
DROP TABLE IF EXISTS departamentos   CASCADE;
DROP TABLE IF EXISTS paises          CASCADE;

-- ---------------------------------------------------------------------
-- Localizacion: pais -> departamento -> ciudad
-- ---------------------------------------------------------------------
CREATE TABLE paises (
  id     SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE departamentos (
  id      SERIAL PRIMARY KEY,
  nombre  VARCHAR(100) NOT NULL,
  pais_id INTEGER NOT NULL REFERENCES paises(id) ON DELETE RESTRICT,
  UNIQUE (nombre, pais_id)
);

CREATE TABLE ciudades (
  id              SERIAL PRIMARY KEY,
  nombre          VARCHAR(100) NOT NULL,
  departamento_id INTEGER NOT NULL REFERENCES departamentos(id) ON DELETE RESTRICT,
  UNIQUE (nombre, departamento_id)
);

-- ---------------------------------------------------------------------
-- Personas (tabla base) y sus perfiles (herencia: cliente, agente, admin)
-- ---------------------------------------------------------------------
CREATE TABLE personas (
  id              SERIAL PRIMARY KEY,
  identificacion  VARCHAR(30)  NOT NULL UNIQUE,
  nombre_completo VARCHAR(150) NOT NULL,
  correo          VARCHAR(150) NOT NULL UNIQUE,
  direccion       VARCHAR(200) NOT NULL,
  ciudad_id       INTEGER NOT NULL REFERENCES ciudades(id) ON DELETE RESTRICT,
  password_hash   VARCHAR(100) NOT NULL
);

CREATE TABLE telefonos (
  id         SERIAL PRIMARY KEY,
  persona_id INTEGER NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  telefono   VARCHAR(30) NOT NULL
);

CREATE TABLE clientes (
  persona_id           INTEGER PRIMARY KEY REFERENCES personas(id) ON DELETE CASCADE,
  puntos               INTEGER NOT NULL DEFAULT 0 CHECK (puntos >= 0),
  visualiza_publicidad BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE agentes (
  persona_id  INTEGER PRIMARY KEY REFERENCES personas(id) ON DELETE CASCADE,
  comision    NUMERIC(5,2) NOT NULL CHECK (comision >= 0 AND comision <= 100),
  experiencia INTEGER NOT NULL DEFAULT 0 CHECK (experiencia >= 0)
);

CREATE TABLE administradores (
  persona_id INTEGER PRIMARY KEY REFERENCES personas(id) ON DELETE CASCADE,
  salario    NUMERIC(14,2) NOT NULL CHECK (salario >= 0),
  horario    VARCHAR(100)  NOT NULL
);

-- ---------------------------------------------------------------------
-- Eventos (los registra un agente)
-- ---------------------------------------------------------------------
CREATE TABLE eventos (
  id                SERIAL PRIMARY KEY,
  nombre            VARCHAR(150) NOT NULL,
  descripcion       TEXT NOT NULL DEFAULT '',
  teatro            VARCHAR(150) NOT NULL,
  ciudad_id         INTEGER NOT NULL REFERENCES ciudades(id) ON DELETE RESTRICT,
  fecha_inicio      TIMESTAMP NOT NULL,
  fecha_fin         TIMESTAMP NOT NULL,
  capacidad         INTEGER NOT NULL CHECK (capacidad > 0),
  precio_base       NUMERIC(12,2) NOT NULL CHECK (precio_base >= 0),
  observaciones     TEXT NOT NULL DEFAULT '',
  estado            VARCHAR(20) NOT NULL DEFAULT 'Programado'
                    CHECK (estado IN ('Programado','En Boletería','En Vivo','Finalizado','Cancelado')),
  agente_id         INTEGER NOT NULL REFERENCES agentes(persona_id) ON DELETE RESTRICT,
  causa_cancelacion TEXT,
  CHECK (fecha_fin >= fecha_inicio)
);

-- ---------------------------------------------------------------------
-- Reservas (las realiza un cliente sobre un evento)
-- ---------------------------------------------------------------------
CREATE TABLE reservas (
  id                SERIAL PRIMARY KEY,
  fecha             TIMESTAMP NOT NULL DEFAULT NOW(),
  valor_total       NUMERIC(14,2) NOT NULL CHECK (valor_total >= 0),
  numero_entradas   INTEGER NOT NULL CHECK (numero_entradas > 0),
  observaciones     TEXT NOT NULL DEFAULT '',
  estado            VARCHAR(20) NOT NULL DEFAULT 'Reservada'
                    CHECK (estado IN ('Reservada','Confirmada','Cancelada')),
  cliente_id        INTEGER NOT NULL REFERENCES clientes(persona_id) ON DELETE RESTRICT,
  evento_id         INTEGER NOT NULL REFERENCES eventos(id) ON DELETE RESTRICT,
  causa_cancelacion TEXT
);

CREATE INDEX idx_eventos_agente   ON eventos(agente_id);
CREATE INDEX idx_reservas_cliente ON reservas(cliente_id);
CREATE INDEX idx_reservas_evento  ON reservas(evento_id);