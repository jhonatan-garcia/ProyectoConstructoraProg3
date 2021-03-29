import {Entity, model, property} from '@loopback/repository';

@model()
export class Ciudad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_ciudad?: number;

  @property({
    type: 'number',
    required: true,
  })
  Codigo: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;


  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
