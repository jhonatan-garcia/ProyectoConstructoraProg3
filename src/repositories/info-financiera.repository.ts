import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {InfoFinanciera, InfoFinancieraRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class InfoFinancieraRepository extends DefaultCrudRepository<
  InfoFinanciera,
  typeof InfoFinanciera.prototype.Id_financiera,
  InfoFinancieraRelations
> {

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof InfoFinanciera.prototype.Id_financiera>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(InfoFinanciera, dataSource);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
