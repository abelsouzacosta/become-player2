import { Request, Response } from 'express';
import CreateCompanyService from '../services/CreateCompanyService';

export default class CompanyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cnpj } = request.body;

    const create = new CreateCompanyService();

    const company = await create.execute({ cnpj_number: cnpj });

    return response.status(200).json(company);
  }
}
