import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {Solicitud} from './solicitud.model';

@model()
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
