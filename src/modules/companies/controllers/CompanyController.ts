import { Request, Response } from 'express';
import CreateCompanyService from '../services/CreateCompanyService';
import ListCompaniesService from '../services/ListCompaniesService';
import UpdateCompanyService from '../services/UpdateCompanyService';

export default class CompanyController {
  public async index(request: Request, response: Response): Promise<Response> {
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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      razao_social,
      nome_fantasia,
      cnae_fiscal_descricao,
      cnpj,
      descricao_situacao_cadastral,
    } = request.body;

    const update = new UpdateCompanyService();

    const company = await update.execute({
      id,
      razao_social,
      nome_fantasia,
      cnae_fiscal_descricao,
      cnpj,
      descricao_situacao_cadastral,
    });

    return response.status(200).json(company);
  }
}
