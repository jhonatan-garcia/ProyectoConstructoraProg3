import {Entity, model, property} from '@loopback/repository';

@model()
export class Proyecto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_proyecto?: number;

  @property({
    type: 'number',
    required: true,
  })
  Codigo: number;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'object',
    required: true,
  })
  Imagen: object;


  constructor(data?: Partial<Proyecto>) {
    super(data);
  }
}

export interface ProyectoRelations {
  // describe navigational properties here
}

export type ProyectoWithRelations = Proyecto & ProyectoRelations;
