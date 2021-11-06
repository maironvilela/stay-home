/*
  Necessário refatorar nome da classe
*/
import { Property } from '../../infra/mysql/entities/Property';
import { IPropertiesRepository } from '../../repositories/IPropertiesRepository';


interface IRequest {
  page: number;
  size: number;
}
export class GetAllPropertiesUseCase {

  private propertiesRepository: IPropertiesRepository;

  constructor(propertiesRepository: IPropertiesRepository) {

    this.propertiesRepository = propertiesRepository;

  }

  async execute({ page = 1, size = 10 }: IRequest): Promise<Property[]> {

    return await this.propertiesRepository.findAll({ page, size });
  }
}
