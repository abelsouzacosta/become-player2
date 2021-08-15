import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompaniesRepository from '../typeorm/repositories/CompaniesRepositories';
import Companies from '../typeorm/entities/Companies';
import IGetCompany from '../interfaces/IGetCompany';
import GetCompanyService from './GetCompanyService';
import CreateCompanyAddressService from './CreateCompanyAddressService';

export default class CreateCompanyService {
  private repository: CompaniesRepository;

  private companyService: GetCompanyService;

  private addressService: CreateCompanyAddressService;

  constructor() {
    this.repository = getCustomRepository(CompaniesRepository);
    this.companyService = new GetCompanyService();
    this.addressService = new CreateCompanyAddressService();
  }

  public async execute({ cnpj_number }: IGetCompany): Promise<Companies> {
    // verifica se a compania já está cadastrada no banco de dados
    const alreadyExists = await this.repository.findByCNPJ(cnpj_number);

    if (alreadyExists) throw new ApplicationError('Company Already exists');

    // retorna os dados da empresa
    const response = await this.companyService.execute({ cnpj_number });

    // desestruturando a resposta da api
    const {
      cnpj,
      razao_social,
      nome_fantasia,
      descricao_situacao_cadastral,
      cnae_fiscal_descricao,
      bairro,
      complemento,
      descricao_tipo_logradouro,
      cep,
      numero,
      logradouro,
      municipio,
      uf,
    } = response;

    // cria a instância da empresa
    const company = this.repository.create({
      cnpj,
      corporate_name: razao_social,
      trade_name: nome_fantasia,
      registration_status: descricao_situacao_cadastral,
      economic_activity_type: cnae_fiscal_descricao,
    });

    // salva a instância
    if (!(await this.repository.save(company)))
      throw new ApplicationError(
        'There was an error trying to create company instance',
      );

    // cria o instância do endereço
    const company_address = await this.addressService.execute({
      descricao_tipo_logradouro,
      logradouro,
      complemento,
      bairro,
      numero,
      municipio,
      cep,
      uf,
      company_id: company.id,
    });

    return company;
  }
}
