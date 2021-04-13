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
  InfoFinanciera,
  Cliente,
} from '../models';
import {InfoFinancieraRepository} from '../repositories';

export class InfoFinancieraClienteController {
  constructor(
    @repository(InfoFinancieraRepository) protected infoFinancieraRepository: InfoFinancieraRepository,
  ) { }

  @get('/info-financieras/{id}/cliente', {
    responses: {
      '200': {
        description: 'InfoFinanciera has one Cliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente> {
    return this.infoFinancieraRepository.cliente(id).get(filter);
  }

  @post('/info-financieras/{id}/cliente', {
    responses: {
      '200': {
        description: 'InfoFinanciera model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfoFinanciera.prototype.Id_financiera,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInInfoFinanciera',
            exclude: ['Id_cliente'],
            optional: ['infoFinancieraId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'Id_cliente'>,
  ): Promise<Cliente> {
    return this.infoFinancieraRepository.cliente(id).create(cliente);
  }

  @patch('/info-financieras/{id}/cliente', {
    responses: {
      '200': {
        description: 'InfoFinanciera.Cliente PATCH success count',
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
    return this.infoFinancieraRepository.cliente(id).patch(cliente, where);
  }

  @del('/info-financieras/{id}/cliente', {
    responses: {
      '200': {
        description: 'InfoFinanciera.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.infoFinancieraRepository.cliente(id).delete(where);
  }
}
