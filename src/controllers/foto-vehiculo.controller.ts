import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Foto,
  Vehiculo,
} from '../models';
import {FotoRepository} from '../repositories';

export class FotoVehiculoController {
  constructor(
    @repository(FotoRepository)
    public fotoRepository: FotoRepository,
  ) { }

  @get('/fotos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Foto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehiculo),
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.number('id') id: typeof Foto.prototype.id,
  ): Promise<Vehiculo> {
    return this.fotoRepository.pertenece_vehiculo(id);
  }
}
