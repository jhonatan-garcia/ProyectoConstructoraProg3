import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
