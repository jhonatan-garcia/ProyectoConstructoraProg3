import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Inmueble} from './inmueble.model';
import {Pago} from './pago.model';

@model({
  settings: {
    foreignKeys: {
      fk_inmueble_id: {
        name: 'fk_inmueble_id',
        entity: 'Inmueble',
        entityKey: 'Id_inmueble',
        foreignKey: 'inmuebleId',
      },
      fk_cliente_id: {
        name: 'fk_cliente_id',
        entity: 'Cliente',
        entityKey: 'Id_cliente',
        foreignKey: 'clienteId',
      },
    },
  },
})
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

  @belongsTo(() => Cliente)
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
