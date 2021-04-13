import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proyecto} from './proyecto.model';
import {Inmueble} from './inmueble.model';

@model()
export class Bloque extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_bloque?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @belongsTo(() => Proyecto)
  proyectoId: number;

  @hasMany(() => Inmueble)
  inmuebles: Inmueble[];

  constructor(data?: Partial<Bloque>) {
    super(data);
  }
}

export interface BloqueRelations {
  // describe navigational properties here
}

export type BloqueWithRelations = Bloque & BloqueRelations;
