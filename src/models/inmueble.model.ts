import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_bloque_id: {
        name: 'fk_bloque_id',
        entity: 'Bloque',
        entityKey: 'Id_bloque',
        foreignKey: 'bloqueId',
      },
    },
  },
})
export class Inmueble extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_inmueble?: number;

  @property({
    type: 'string',
    required: true,
  })
  Identificador: string;

  @property({
    type: 'number',
    required: true,
  })
  Valor: number;

  @belongsTo(() => Bloque)
  bloqueId: number;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
