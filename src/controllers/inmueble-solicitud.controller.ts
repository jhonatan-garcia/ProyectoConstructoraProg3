import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Inmueble,
  Solicitud,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleSolicitudController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Inmueble has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.inmuebleRepository.solicituds(id).find(filter);
  }

  @post('/inmuebles/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Inmueble.prototype.Id_inmueble,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInInmueble',
            exclude: ['Id_solicitud'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'Id_solicitud'>,
  ): Promise<Solicitud> {
    return this.inmuebleRepository.solicituds(id).create(solicitud);
  }

  @patch('/inmuebles/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Inmueble.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.inmuebleRepository.solicituds(id).patch(solicitud, where);
  }

  @del('/inmuebles/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Inmueble.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.inmuebleRepository.solicituds(id).delete(where);
  }
}
