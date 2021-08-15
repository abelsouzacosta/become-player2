import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import Company from '../typeorm/entities/Company';
import MakeRequestService from './MakeRequestService';
import CreateCompanyAddressService from './CreateCompanyAddressService';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';

interface ICompanyCreate {
  cnpj_number: string;
}

export default class CreateCompanyService {
  private repository: CompanyRepository;

  private request: MakeRequestService;

  private createAddress: CreateCompanyAddressService;

  constructor() {
    this.repository = getCustomRepository(CompanyRepository);
    this.request = new MakeRequestService();
    this.createAddress = new CreateCompanyAddressService();
  }

  public async execute({ cnpj_number }: ICompanyCreate): Promise<Company> {
    // verifica se a amepresa já está cadastrada
    const alreadyExists = await this.repository.findByCNPJ(cnpj_number);

    if (alreadyExists) throw new ApplicationError('Company already exists');

    // busca pelos dados da empresa
    const data = await this.request.execute({ cnpj: cnpj_number });

    // desestruturando os dados retornados da api
    const {
      descricao_tipo_logradouro,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      uf,
      municipio,
      cnpj,
      razao_social,
      nome_fantasia,
      descricao_situacao_cadastral,
      cnae_fiscal_descricao,
    } = data;

    // cria a instancia do endereco
    const address = await this.createAddress.execute({
      descricao_tipo_logradouro,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      uf,
      municipio,
    });

    // desestrutura o id do endereco
    const { id: address_id } = address;

    // cria a instãncia de empresa
    const company = this.repository.create({
      cnpj,
      razao_social,
      nome_fantasia,
      descricao_situacao_cadastral,
      cnae_fiscal_descricao,
      address_id,
    });

    // salva a instancia
    if (!(await this.repository.save(company)))
      throw new ApplicationError(
        'There was an error trying to create an company instance',
      );

    return company;
  }
}
