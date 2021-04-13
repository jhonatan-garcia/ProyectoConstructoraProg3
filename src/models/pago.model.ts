import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Pago extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_pago?: number;

  @property({
    type: 'number',
    required: true,
  })
  Aporte: number;

  @property({
    type: 'date',
    required: true,
  })
  Fecha_pago: string;

  @belongsTo(() => Solicitud)
  solicitudId: number;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
