import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Marca} from './marca.model';
import {Categoria} from './categoria.model';
import {CategoriaVehiculo} from './categoria-vehiculo.model';
import {Foto} from './foto.model';
import {Proveedor} from './proveedor.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'number',
    required: true,
  })
  modelo: number;

  @property({
    type: 'string',
    required: true,
  })
  serie_chasis: string;

  @property({
    type: 'string',
    required: true,
  })
  serie_motor: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  estado?: boolean;

  @belongsTo(() => Marca, {name: 'pertenece_marca'})
  id_marca: number;

  @hasMany(() => Categoria, {through: {model: () => CategoriaVehiculo, keyFrom: 'id_vehiculo', keyTo: 'id_categoria'}})
  tiene_categoria: Categoria[];

  @hasMany(() => Foto, {keyTo: 'id_vehiculo'})
  fotos: Foto[];

  @belongsTo(() => Proveedor, {name: 'tiene_proveedor'})
  id_proveedor: number;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
