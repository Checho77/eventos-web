-- =====================================================================
-- EventosApp - Datos de prueba
-- Ejecutar con: npm run db:seed   (despues de npm run db:init)
-- Contrasena de TODOS los usuarios de prueba: 123456
-- =====================================================================

-- Localizacion -------------------------------------------------------
INSERT INTO paises (id, nombre) VALUES
  (1, 'Colombia'),
  (2, 'México');

INSERT INTO departamentos (id, nombre, pais_id) VALUES
  (1, 'Valle del Cauca', 1),
  (2, 'Cundinamarca', 1),
  (3, 'Antioquia', 1),
  (4, 'Atlántico', 1),
  (5, 'Ciudad de México', 2);

INSERT INTO ciudades (id, nombre, departamento_id) VALUES
  (1, 'Cali', 1),
  (2, 'Bogotá', 2),
  (3, 'Medellín', 3),
  (4, 'Tuluá', 1),
  (5, 'Barranquilla', 4),
  (6, 'Ciudad de México', 5);

-- Personas (id 1-3 clientes, 4-5 agentes, 6 administrador) -----------
-- password_hash = bcrypt de "123456"
INSERT INTO personas (id, identificacion, nombre_completo, correo, direccion, ciudad_id, password_hash) VALUES
  (1, '1010101010', 'Laura Gómez',      'laura.gomez@email.com',         'Carrera 5 # 10-20',   1, '$2b$10$C.waRqhCKt9bwxxvltxVUe6KjFno2HwOSQJZyPlIA4fDE5FxbBHDK'),
  (2, '1020304050', 'Carlos Ramírez',   'carlos.ramirez@email.com',      'Calle 15 # 8-30',     4, '$2b$10$C.waRqhCKt9bwxxvltxVUe6KjFno2HwOSQJZyPlIA4fDE5FxbBHDK'),
  (3, '52123456',   'Marta Rojas',      'marta.rojas@email.com',         'Avenida 80 # 45-12',  2, '$2b$10$C.waRqhCKt9bwxxvltxVUe6KjFno2HwOSQJZyPlIA4fDE5FxbBHDK'),
  (4, '1144556677', 'Andrés Cifuentes', 'andres.cifuentes@eventos.com',  'Calle 5 # 38-10',     1, '$2b$10$C.waRqhCKt9bwxxvltxVUe6KjFno2HwOSQJZyPlIA4fDE5FxbBHDK'),
  (5, '1088990011', 'Valentina Mora',   'valentina.mora@eventos.com',    'Carrera 43A # 1-50',  3, '$2b$10$C.waRqhCKt9bwxxvltxVUe6KjFno2HwOSQJZyPlIA4fDE5FxbBHDK'),
  (6, '1122334455', 'Sergio David Castro', 'admin@eventos.com',             'Calle 10 # 4-20',     1, '$2b$10$C.waRqhCKt9bwxxvltxVUe6KjFno2HwOSQJZyPlIA4fDE5FxbBHDK');

INSERT INTO telefonos (persona_id, telefono) VALUES
  (1, '3001234567'), (1, '3157654321'),
  (2, '3109876543'),
  (3, '3201112233'),
  (4, '3004445566'),
  (5, '3118889900'),
  (6, '3012223344');

INSERT INTO clientes (persona_id, puntos, visualiza_publicidad) VALUES
  (1, 120, TRUE),
  (2, 45,  FALSE),
  (3, 300, TRUE);

INSERT INTO agentes (persona_id, comision, experiencia) VALUES
  (4, 8, 5),
  (5, 10, 7);

INSERT INTO administradores (persona_id, salario, horario) VALUES
  (6, 4500000, 'Lunes a viernes, 8:00 a.m. a 5:00 p.m.');

-- Eventos ------------------------------------------------------------
INSERT INTO eventos (id, nombre, descripcion, teatro, ciudad_id, fecha_inicio, fecha_fin, capacidad, precio_base, observaciones, estado, agente_id, causa_cancelacion) VALUES
  (1, 'Festival Salsa al Parque', 'Una noche de salsa con las mejores orquestas de la ciudad.', 'Teatro al Aire Libre Los Cristales', 1, '2026-11-14 18:00', '2026-11-14 23:30', 1500, 60000, 'Ingreso desde las 5:00 p.m.', 'En Boletería', 4, NULL),
  (2, 'Obra: La Vorágine', 'Adaptación teatral de la novela clásica colombiana.', 'Teatro Colón', 2, '2026-11-05 20:00', '2026-11-05 22:30', 600, 70000, 'Recomendada para mayores de 12 años.', 'En Boletería', 4, NULL),
  (3, 'Concierto Sinfónico de Navidad', 'La orquesta sinfónica interpreta los clásicos navideños.', 'Teatro Pablo Tobón Uribe', 3, '2026-12-12 19:30', '2026-12-12 22:00', 900, 95000, 'Vestimenta formal sugerida.', 'Programado', 5, NULL),
  (4, 'Noche de Comedia Stand-Up', 'Cuatro comediantes nacionales en una sola función.', 'Teatro Municipal de Tuluá', 4, '2026-10-30 20:00', '2026-10-30 22:00', 400, 45000, 'Solo mayores de 16 años.', 'En Boletería', 5, NULL),
  (5, 'Gran Carnaval Tributo', 'Desfile y conciertos en homenaje al carnaval.', 'Plaza de la Paz', 5, '2026-10-15 17:00', '2026-10-15 23:00', 5000, 120000, 'Evento en curso.', 'En Vivo', 4, NULL),
  (6, 'Ballet El Cascanueces', 'El clásico ballet navideño en versión completa.', 'Teatro Jorge Eliécer Gaitán', 2, '2026-09-20 18:00', '2026-09-20 20:30', 1000, 110000, 'Función finalizada.', 'Finalizado', 5, NULL),
  (7, 'Festival de Jazz de Medellín', 'Tres días de jazz con artistas internacionales.', 'Teatro Lido', 3, '2026-08-15 17:00', '2026-08-15 23:00', 1200, 80000, 'Festival finalizado.', 'Finalizado', 4, NULL),
  (8, 'Concierto Rock Latino', 'Las bandas más importantes del rock en español.', 'Auditorio Nacional', 6, '2026-10-25 20:00', '2026-10-25 23:30', 3000, 150000, 'Evento cancelado.', 'Cancelado', 5, 'Condiciones climáticas adversas.'),
  (9, 'Gala de Ópera', 'Selección de las arias más famosas de la ópera.', 'Teatro Municipal Enrique Buenaventura', 1, '2026-12-05 19:00', '2026-12-05 21:30', 700, 130000, 'Vestimenta formal.', 'Programado', 4, NULL);

-- Reservas -----------------------------------------------------------
INSERT INTO reservas (id, fecha, valor_total, numero_entradas, observaciones, estado, cliente_id, evento_id, causa_cancelacion) VALUES
  (1,  '2026-10-01 10:15', 120000, 2, 'Zona preferencial',      'Confirmada', 1, 1, NULL),
  (2,  '2026-10-02 14:30', 280000, 4, 'Grupo familiar',         'Reservada',  3, 2, NULL),
  (3,  '2026-10-03 09:00', 135000, 3, 'Sin observaciones',      'Confirmada', 2, 4, NULL),
  (4,  '2026-10-05 16:45', 190000, 2, 'Cerca del escenario',    'Reservada',  1, 3, NULL),
  (5,  '2026-10-06 11:20', 120000, 1, 'Sin observaciones',      'Confirmada', 3, 5, NULL),
  (6,  '2026-09-10 18:00', 220000, 2, 'Sin observaciones',      'Confirmada', 1, 6, NULL),
  (7,  '2026-08-01 12:00', 240000, 3, 'Sin observaciones',      'Confirmada', 2, 7, NULL),
  (8,  '2026-10-08 08:30', 300000, 2, 'Sin observaciones',      'Cancelada',  3, 8, 'El evento fue cancelado por condiciones climáticas.'),
  (9,  '2026-10-09 13:10', 260000, 2, 'Palco',                  'Reservada',  2, 9, NULL),
  (10, '2026-10-10 19:00', 300000, 5, 'Sin observaciones',      'Cancelada',  2, 1, 'El cliente solicitó la cancelación.'),
  (11, '2026-05-12 10:00', 160000, 2, 'Sin observaciones',      'Confirmada', 1, 7, NULL),
  (12, '2026-06-18 15:30', 240000, 3, 'Sin observaciones',      'Confirmada', 3, 7, NULL),
  (13, '2026-07-07 09:45', 160000, 2, 'Sin observaciones',      'Confirmada', 2, 7, NULL),
  (14, '2026-07-22 17:20', 330000, 3, 'Sin observaciones',      'Confirmada', 1, 6, NULL),
  (15, '2026-08-19 12:10', 220000, 2, 'Sin observaciones',      'Confirmada', 3, 6, NULL),
  (16, '2026-09-25 14:00', 240000, 2, 'Sin observaciones',      'Confirmada', 3, 5, NULL);

-- Reiniciar las secuencias (porque se insertaron ids explicitos) -----
SELECT setval(pg_get_serial_sequence('paises', 'id'),         (SELECT MAX(id) FROM paises));
SELECT setval(pg_get_serial_sequence('departamentos', 'id'),  (SELECT MAX(id) FROM departamentos));
SELECT setval(pg_get_serial_sequence('ciudades', 'id'),       (SELECT MAX(id) FROM ciudades));
SELECT setval(pg_get_serial_sequence('personas', 'id'),       (SELECT MAX(id) FROM personas));
SELECT setval(pg_get_serial_sequence('telefonos', 'id'),      (SELECT MAX(id) FROM telefonos));
SELECT setval(pg_get_serial_sequence('eventos', 'id'),        (SELECT MAX(id) FROM eventos));
SELECT setval(pg_get_serial_sequence('reservas', 'id'),       (SELECT MAX(id) FROM reservas));