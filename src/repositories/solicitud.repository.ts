import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Inmueble, Cliente, Pago} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {ClienteRepository} from './cliente.repository';
import {PagoRepository} from './pago.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.Id_solicitud,
  SolicitudRelations
> {

  public readonly inmueble: BelongsToAccessor<Inmueble, typeof Solicitud.prototype.Id_solicitud>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Solicitud.prototype.Id_solicitud>;

  public readonly pagos: HasManyRepositoryFactory<Pago, typeof Solicitud.prototype.Id_solicitud>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.pagos = this.createHasManyRepositoryFactoryFor('pagos', pagoRepositoryGetter,);
    this.registerInclusionResolver('pagos', this.pagos.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.inmueble = this.createBelongsToAccessorFor('inmueble', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
