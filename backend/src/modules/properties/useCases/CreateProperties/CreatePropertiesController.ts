/**
   * @summary Controller responsável pela criação de um imóvel.
**/

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { Property } from '@modules/properties/infra/mysql/entities/Property';
import { CreatePropertiesUseCase } from './CreatePropertiesUseCase';

export class CreatePropertiesController {


  /**
     * @description Função chamada pela rota para receber a as informações do cliente rest. Recebe através do corpo da requisição as informações dos imóveis
     * @param request request (express) da requisição
     * @param response response (express) da requisição
     * @returns retorna o recurso do imóvel criado
     * @Example propertiesRoutes.post('/', createPropertiesController.handle);
   */
  async handle(request: Request, response: Response): Promise<Response<Property>> {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }


    const {
      propertyImages,
      description,
      salePrice,
      rentalPrice,
      isLocation,
      isSale,
      specifications,
      propertyType,
      address,
      aboutTheProperty } = request.body;


    const property = {
      description,
      salePrice,
      rentalPrice,
      isLocation,
      isSale,
      specifications,
      propertyType,
      address,
      propertyImages,
      aboutTheProperty
    };


    const createPropertiesUseCase = container.resolve(CreatePropertiesUseCase);

    const result = await createPropertiesUseCase.execute(property);


    return response.json(result);
  }

}
