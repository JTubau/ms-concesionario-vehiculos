import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConcesionarioDbDataSource} from '../datasources';
import {CategoriaVehiculo, CategoriaVehiculoRelations} from '../models';

export class CategoriaVehiculoRepository extends DefaultCrudRepository<
  CategoriaVehiculo,
  typeof CategoriaVehiculo.prototype.id,
  CategoriaVehiculoRelations
> {
  constructor(
    @inject('datasources.concesionarioDB') dataSource: ConcesionarioDbDataSource,
  ) {
    super(CategoriaVehiculo, dataSource);
  }
}
