import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculo,
  Foto,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoFotoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/fotos', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Foto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Foto>,
  ): Promise<Foto[]> {
    return this.vehiculoRepository.fotos(id).find(filter);
  }

  @post('/vehiculos/{id}/fotos', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Foto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {
            title: 'NewFotoInVehiculo',
            exclude: ['id'],
            optional: ['id_vehiculo']
          }),
        },
      },
    }) foto: Omit<Foto, 'id'>,
  ): Promise<Foto> {
    return this.vehiculoRepository.fotos(id).create(foto);
  }

  @patch('/vehiculos/{id}/fotos', {
    responses: {
      '200': {
        description: 'Vehiculo.Foto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {partial: true}),
        },
      },
    })
    foto: Partial<Foto>,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.vehiculoRepository.fotos(id).patch(foto, where);
  }

  @del('/vehiculos/{id}/fotos', {
    responses: {
      '200': {
        description: 'Vehiculo.Foto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.vehiculoRepository.fotos(id).delete(where);
  }
}
