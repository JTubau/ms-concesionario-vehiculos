import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConcesionarioDbDataSource} from '../datasources';
import {Foto, FotoRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class FotoRepository extends DefaultCrudRepository<
  Foto,
  typeof Foto.prototype.id,
  FotoRelations
> {

  public readonly pertenece_vehiculo: BelongsToAccessor<Vehiculo, typeof Foto.prototype.id>;

  constructor(
    @inject('datasources.concesionarioDB') dataSource: ConcesionarioDbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Foto, dataSource);
    this.pertenece_vehiculo = this.createBelongsToAccessorFor('pertenece_vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('pertenece_vehiculo', this.pertenece_vehiculo.inclusionResolver);
  }
}
