import {Model, model, property} from '@loopback/repository';

@model()
export class CambiarClave extends Model {

  @property({
    type: 'string',
    required: true,
  })
  Id_usuario?: string;

  @property({
    type: 'string',
    required: true,
  })
  Contrasena?: string;

  @property({
    type: 'string',
    required: true,
  })
  ContrasenaNueva?: string;

  constructor(data?: Partial<CambiarClave>) {
    super(data);
  }
}

export interface CambiarClaveRelations {
  // describe navigational properties here
}

export type CambiarClaveWithRelations = CambiarClave & CambiarClaveRelations;
