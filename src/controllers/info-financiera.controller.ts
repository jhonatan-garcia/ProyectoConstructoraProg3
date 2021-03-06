import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {InfoFinanciera} from '../models';
import {InfoFinancieraRepository} from '../repositories';

@authenticate('vend')
export class InfoFinancieraController {
  constructor(
    @repository(InfoFinancieraRepository)
    public infoFinancieraRepository: InfoFinancieraRepository,
  ) { }

  @post('/info-financieras')
  @response(200, {
    description: 'InfoFinanciera model instance',
    content: {'application/json': {schema: getModelSchemaRef(InfoFinanciera)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfoFinanciera, {
            title: 'NewInfoFinanciera',
            exclude: ['Id_financiera'],
          }),
        },
      },
    })
    infoFinanciera: Omit<InfoFinanciera, 'Id_financiera'>,
  ): Promise<InfoFinanciera> {
    return this.infoFinancieraRepository.create(infoFinanciera);
  }
  @authenticate.skip()
  @get('/info-financieras/count')
  @response(200, {
    description: 'InfoFinanciera model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InfoFinanciera) where?: Where<InfoFinanciera>,
  ): Promise<Count> {
    return this.infoFinancieraRepository.count(where);
  }
  @authenticate.skip()
  @get('/info-financieras')
  @response(200, {
    description: 'Array of InfoFinanciera model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InfoFinanciera, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InfoFinanciera) filter?: Filter<InfoFinanciera>,
  ): Promise<InfoFinanciera[]> {
    return this.infoFinancieraRepository.find(filter);
  }

  @patch('/info-financieras')
  @response(200, {
    description: 'InfoFinanciera PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfoFinanciera, {partial: true}),
        },
      },
    })
    infoFinanciera: InfoFinanciera,
    @param.where(InfoFinanciera) where?: Where<InfoFinanciera>,
  ): Promise<Count> {
    return this.infoFinancieraRepository.updateAll(infoFinanciera, where);
  }
  @authenticate.skip()
  @get('/info-financieras/{id}')
  @response(200, {
    description: 'InfoFinanciera model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InfoFinanciera, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InfoFinanciera, {exclude: 'where'}) filter?: FilterExcludingWhere<InfoFinanciera>
  ): Promise<InfoFinanciera> {
    return this.infoFinancieraRepository.findById(id, filter);
  }

  @patch('/info-financieras/{id}')
  @response(204, {
    description: 'InfoFinanciera PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfoFinanciera, {partial: true}),
        },
      },
    })
    infoFinanciera: InfoFinanciera,
  ): Promise<void> {
    await this.infoFinancieraRepository.updateById(id, infoFinanciera);
  }

  @put('/info-financieras/{id}')
  @response(204, {
    description: 'InfoFinanciera PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() infoFinanciera: InfoFinanciera,
  ): Promise<void> {
    await this.infoFinancieraRepository.replaceById(id, infoFinanciera);
  }

  @del('/info-financieras/{id}')
  @response(204, {
    description: 'InfoFinanciera DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.infoFinancieraRepository.deleteById(id);
  }
}
