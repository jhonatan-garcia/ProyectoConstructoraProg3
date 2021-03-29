import {Entity, model, property} from '@loopback/repository';

@model()
export class Pais extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

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


  constructor(data?: Partial<Pais>) {
    super(data);
  }
}

export interface PaisRelations {
  // describe navigational properties here
}

export type PaisWithRelations = Pais & PaisRelations;
