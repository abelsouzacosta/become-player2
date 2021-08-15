import { Request, Response } from 'express';
import CompanyDetailsService from '../services/CompanyDetailsService';
import CreateCompanyService from '../services/CreateCompanyService';
import ListCompaniesService from '../services/ListCompaniesService';

export default class CompanyController {
  public async list(request: Request, response: Response): Promise<Response> {
    const list = new ListCompaniesService();

    const companies = await list.execute();

    return response.status(200).json(companies);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { cnpj } = request.body;

    const create = new CreateCompanyService();

    const company = await create.execute({ cnpj_number: cnpj });

    return response.status(200).json(company);
  }

  public async details(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const details = new CompanyDetailsService();

    const company = await details.execute({ id });

    return response.status(200).json(company);
  }
}
