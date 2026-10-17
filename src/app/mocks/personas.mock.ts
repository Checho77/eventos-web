import { Administrador, Agente, Cliente } from '../models/persona';
import { BOGOTA, CALI, MEDELLIN, TULUA } from './ciudades.mock';

export const CLIENTES: Cliente[] = [
  {
    id: 1,
    identificacion: '1010101010',
    nombreCompleto: 'Laura Gómez',
    correo: 'laura.gomez@email.com',
    direccion: 'Carrera 5 # 10-20',
    ciudad: CALI,
    telefonos: ['3001234567', '3157654321'],
    puntos: 120,
    visualizaPublicidad: true
  },
  {
    id: 2,
    identificacion: '1020304050',
    nombreCompleto: 'Carlos Ramírez',
    correo: 'carlos.ramirez@email.com',
    direccion: 'Calle 15 # 8-30',
    ciudad: TULUA,
    telefonos: ['3109876543'],
    puntos: 45,
    visualizaPublicidad: false
  },
  {
    id: 3,
    identificacion: '52123456',
    nombreCompleto: 'Marta Rojas',
    correo: 'marta.rojas@email.com',
    direccion: 'Avenida 80 # 45-12',
    ciudad: BOGOTA,
    telefonos: ['3201112233'],
    puntos: 300,
    visualizaPublicidad: true
  }
];

export const AGENTES: Agente[] = [
  {
    id: 1,
    identificacion: '1144556677',
    nombreCompleto: 'Andrés Cifuentes',
    correo: 'andres.cifuentes@eventos.com',
    direccion: 'Calle 5 # 38-10',
    ciudad: CALI,
    telefonos: ['3004445566'],
    comision: 8,
    experiencia: 5
  },
  {
    id: 2,
    identificacion: '1088990011',
    nombreCompleto: 'Valentina Mora',
    correo: 'valentina.mora@eventos.com',
    direccion: 'Carrera 43A # 1-50',
    ciudad: MEDELLIN,
    telefonos: ['3118889900'],
    comision: 10,
    experiencia: 7
  }
];

export const ADMINISTRADORES: Administrador[] = [
  {
    id: 1,
    identificacion: '1122334455',
    nombreCompleto: 'Sergio Álvarez',
    correo: 'admin@eventos.com',
    direccion: 'Calle 10 # 4-20',
    ciudad: CALI,
    telefonos: ['3012223344'],
    salario: 4500000,
    horario: 'Lunes a viernes, 8:00 a.m. a 5:00 p.m.'
  }
];
