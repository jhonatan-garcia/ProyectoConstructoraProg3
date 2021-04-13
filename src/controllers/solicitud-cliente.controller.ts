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
  Solicitud,
  Cliente,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudClienteController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.solicitudRepository.clientes(id).find(filter);
  }

  @post('/solicituds/{id}/clientes', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.Id_solicitud,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInSolicitud',
            exclude: ['Id_cliente'],
            optional: ['solicitudId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'Id_cliente'>,
  ): Promise<Cliente> {
    return this.solicitudRepository.clientes(id).create(cliente);
  }

  @patch('/solicituds/{id}/clientes', {
    responses: {
      '200': {
        description: 'Solicitud.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.solicitudRepository.clientes(id).patch(cliente, where);
  }

  @del('/solicituds/{id}/clientes', {
    responses: {
      '200': {
        description: 'Solicitud.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.solicitudRepository.clientes(id).delete(where);
  }
}
