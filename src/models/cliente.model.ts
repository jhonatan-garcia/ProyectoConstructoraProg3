import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_id: {
        name: 'fk_ciudad_id',
        entity: 'Ciudad',
        entityKey: 'Id_ciudad',
        foreignKey: 'ciudadId',
      }
    },
  },
})
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_cliente?: number;

  @property({
    type: 'number',
    required: true,
  })
  Documento: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  Fecha_nacimiento: string;

  @property({
    type: 'object',
    required: true,
  })
  Fotografia: object;

  @property({
    type: 'number',
    required: true,
  })
  Celular: number;

  @property({
    type: 'string',
    required: true,
  })
  Correo_electronico: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Contrasena: string;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => Solicitud)
  solicitudId: number;


  @property({
    type: 'number',
  })
  infoFinancieraId?: number;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
