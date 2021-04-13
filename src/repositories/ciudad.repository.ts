import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Proyecto, Pais, Cliente} from '../models';
import {ProyectoRepository} from './proyecto.repository';
import {PaisRepository} from './pais.repository';
import {ClienteRepository} from './cliente.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.Id_ciudad,
  CiudadRelations
> {

  public readonly proyectos: HasManyRepositoryFactory<Proyecto, typeof Ciudad.prototype.Id_ciudad>;

  public readonly paisCiudad: BelongsToAccessor<Pais, typeof Ciudad.prototype.Id_ciudad>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Ciudad.prototype.Id_ciudad>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ProyectoRepository') protected proyectoRepositoryGetter: Getter<ProyectoRepository>, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Ciudad, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.paisCiudad = this.createBelongsToAccessorFor('paisCiudad', paisRepositoryGetter,);
    this.registerInclusionResolver('paisCiudad', this.paisCiudad.inclusionResolver);
    this.proyectos = this.createHasManyRepositoryFactoryFor('proyectos', proyectoRepositoryGetter,);
    this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
  }
}
