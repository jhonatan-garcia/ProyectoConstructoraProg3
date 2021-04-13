import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Cliente} from './cliente.model';
import {Pago} from './pago.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_solicitud?: number;

  @property({
    type: 'date',
    required: true,
  })
  FechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'number',
    required: true,
  })
  OfertaEconomica: number;

  @belongsTo(() => Inmueble)
  inmuebleId: number;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Pago)
  pagos: Pago[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
