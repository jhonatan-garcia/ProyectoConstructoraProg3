import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Ciudad, Solicitud, InfoFinanciera} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {SolicitudRepository} from './solicitud.repository';
import {InfoFinancieraRepository} from './info-financiera.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.Id_cliente,
  ClienteRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Cliente.prototype.Id_cliente>;

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof Cliente.prototype.Id_cliente>;

  public readonly infoFinanciera: HasOneRepositoryFactory<InfoFinanciera, typeof Cliente.prototype.Id_cliente>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('InfoFinancieraRepository') protected infoFinancieraRepositoryGetter: Getter<InfoFinancieraRepository>,
  ) {
    super(Cliente, dataSource);
    this.infoFinanciera = this.createHasOneRepositoryFactoryFor('infoFinanciera', infoFinancieraRepositoryGetter);
    this.registerInclusionResolver('infoFinanciera', this.infoFinanciera.inclusionResolver);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
