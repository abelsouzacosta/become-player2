import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';
import Company from '../typeorm/entities/Company';

interface IUpdateCompany {
  id: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  descricao_situacao_cadastral: string;
  cnae_fiscal_descricao: string;
}

export default class UpdateCompanyService {
  private repository: CompanyRepository;

  constructor() {
    this.repository = getCustomRepository(CompanyRepository);
  }

  public async execute({
    id,
    cnpj,
    razao_social,
    nome_fantasia,
    descricao_situacao_cadastral,
    cnae_fiscal_descricao,
  }: IUpdateCompany): Promise<Company> {
    // verifica se a empresa existe
    const company = await this.repository.findById(id);

    if (!company) throw new ApplicationError('Company not found');

    // encontrando a empresa pelo cnpj
    const foundByCNPJ = await this.repository.findByCNPJ(cnpj);

    // verifica se o cnpj passado pertence a outra empresa
    if (foundByCNPJ && foundByCNPJ.id !== company.id)
      throw new ApplicationError(
        'This cnpj number belongs to another instance of Company',
      );

    company.cnpj = cnpj;
    company.razao_social = razao_social;
    company.nome_fantasia = nome_fantasia;
    company.descricao_situacao_cadastral = descricao_situacao_cadastral;
    company.cnae_fiscal_descricao = cnae_fiscal_descricao;

    // salva a instância
    if (!(await this.repository.save(company)))
      throw new ApplicationError(
        'There was an error trying to update company instance',
      );

    return company;
  }
}
