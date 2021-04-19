import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Bloque} from './bloque.model';
import {Ciudad} from './ciudad.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_id: {
        name: 'fk_ciudad_proyecto_id',
        entity: 'Ciudad',
        entityKey: 'Id_ciudad',
        foreignKey: 'ciudad',
      },
    },
  },
})
export class Proyecto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_proyecto?: number;

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

  @property({
    type: 'object',
    required: true,
  })
  Imagen: object;

  @belongsTo(() => Ciudad, {name: 'ciudadProyecto'})
  ciudad: number;

  @hasMany(() => Bloque)
  bloques: Bloque[];

  constructor(data?: Partial<Proyecto>) {
    super(data);
  }
}

export interface ProyectoRelations {
  // describe navigational properties here
}

export type ProyectoWithRelations = Proyecto & ProyectoRelations;
