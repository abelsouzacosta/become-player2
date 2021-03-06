import { Request, Response } from 'express';
import CompanyDetailsService from '../services/CompanyDetailsService';
import CreateCompanyService from '../services/CreateCompanyService';
import DeleteCompanyService from '../services/DeleteCompanyService';
import ListCompaniesService from '../services/ListCompaniesService';
import UpdateCompanyAddressService from '../services/UpdateCompanyAddressService';
import UpdateCompanyPhoneService from '../services/UpdateCompanyPhoneService';
import UpdateCompanyService from '../services/UpdateCompanyService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      cnpj,
      razao_social,
      nome_fantasia,
      descricao_situacao_cadastral,
      cnae_fiscal_descricao,
    } = request.body;

    const update = new UpdateCompanyService();

    const company = await update.execute({
      id,
      cnpj,
      razao_social,
      nome_fantasia,
      descricao_situacao_cadastral,
      cnae_fiscal_descricao,
    });

    return response.status(200).json(company);
  }

  public async updateAddress(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const {
      descricao_tipo_logradouro,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      uf,
      municipio,
    } = request.body;

    const updateAddress = new UpdateCompanyAddressService();

    const address = await updateAddress.execute({
      id,
      descricao_tipo_logradouro,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      uf,
      municipio,
    });

    return response.status(200).json(address);
  }

  public async updatePhones(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { ddd_telefone_1, ddd_telefone_2, ddd_fax } = request.body;

    const updatePhones = new UpdateCompanyPhoneService();

    const phones = await updatePhones.execute({
      id,
      ddd_telefone_1,
      ddd_telefone_2,
      ddd_fax,
    });

    return response.status(200).json(phones);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const delete_company = new DeleteCompanyService();

    const deleted = await delete_company.execute({ id });

    return response.status(200).json(deleted);
  }
}
