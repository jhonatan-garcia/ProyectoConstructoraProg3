import {Entity, model, property} from '@loopback/repository';

@model()
export class InfoFinanciera extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id_Financiera?: number;

  @property({
    type: 'number',
    required: true,
  })
  Total_ingresos: number;

  @property({
    type: 'string',
    required: true,
  })
  Datos_trabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  Tiempo_trab_actual: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre_ref_familiar: string;

  @property({
    type: 'number',
    required: true,
  })
  Telefono_ref_familiar: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre_ref_personal: string;

  @property({
    type: 'number',
    required: true,
  })
  Telefono_ref_personal: number;


  constructor(data?: Partial<InfoFinanciera>) {
    super(data);
  }
}

export interface InfoFinancieraRelations {
  // describe navigational properties here
}

export type InfoFinancieraWithRelations = InfoFinanciera & InfoFinancieraRelations;
