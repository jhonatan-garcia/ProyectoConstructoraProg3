import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Pais} from './pais.model';
import {Proyecto} from './proyecto.model';
import {Cliente} from './cliente.model';

@model()
export class Ciudad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_ciudad?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @hasMany(() => Proyecto, {keyTo: 'ciudad'})
  proyectos: Proyecto[];

  @belongsTo(() => Pais, {name: 'paisCiudad'})
  pais: number;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
