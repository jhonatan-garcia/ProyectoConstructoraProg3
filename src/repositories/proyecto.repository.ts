import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Proyecto, ProyectoRelations, Ciudad, Bloque} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {BloqueRepository} from './bloque.repository';

export class ProyectoRepository extends DefaultCrudRepository<
  Proyecto,
  typeof Proyecto.prototype.Id_proyecto,
  ProyectoRelations
> {

  public readonly ciudadProyecto: BelongsToAccessor<Ciudad, typeof Proyecto.prototype.Id_proyecto>;

  public readonly bloques: HasManyRepositoryFactory<Bloque, typeof Proyecto.prototype.Id_proyecto>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>,
  ) {
    super(Proyecto, dataSource);
    this.bloques = this.createHasManyRepositoryFactoryFor('bloques', bloqueRepositoryGetter,);
    this.registerInclusionResolver('bloques', this.bloques.inclusionResolver);
    this.ciudadProyecto = this.createBelongsToAccessorFor('ciudadProyecto', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudadProyecto', this.ciudadProyecto.inclusionResolver);
  }
}
