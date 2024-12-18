import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {ConcesionarioDbDataSource} from '../datasources';
import {Categoria, CategoriaVehiculo, Foto, Marca, Proveedor, Vehiculo, VehiculoRelations} from '../models';
import {CategoriaVehiculoRepository} from './categoria-vehiculo.repository';
import {CategoriaRepository} from './categoria.repository';
import {FotoRepository} from './foto.repository';
import {MarcaRepository} from './marca.repository';
import {ProveedorRepository} from './proveedor.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly pertenece: BelongsToAccessor<Marca, typeof Vehiculo.prototype.id>;

  public readonly tiene_categoria: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
    CategoriaVehiculo,
    typeof Vehiculo.prototype.id
  >;

  public readonly fotos: HasManyRepositoryFactory<Foto, typeof Vehiculo.prototype.id>;

  public readonly tiene_proveedor: BelongsToAccessor<Proveedor, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.concesionarioDB') dataSource: ConcesionarioDbDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>, @repository.getter('CategoriaVehiculoRepository') protected categoriaVehiculoRepositoryGetter: Getter<CategoriaVehiculoRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('FotoRepository') protected fotoRepositoryGetter: Getter<FotoRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.tiene_proveedor = this.createBelongsToAccessorFor('tiene_proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('tiene_proveedor', this.tiene_proveedor.inclusionResolver);
    this.fotos = this.createHasManyRepositoryFactoryFor('fotos', fotoRepositoryGetter,);
    this.registerInclusionResolver('fotos', this.fotos.inclusionResolver);
    this.tiene_categoria = this.createHasManyThroughRepositoryFactoryFor('tiene_categoria', categoriaRepositoryGetter, categoriaVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tiene_categoria', this.tiene_categoria.inclusionResolver);
    this.pertenece = this.createBelongsToAccessorFor('pertenece_marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('pertenece_marca', this.pertenece.inclusionResolver);
  }
}
