import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import Companies from '../typeorm/entities/Companies';
import CompaniesRepository from '../typeorm/repositories/CompaniesRepositories';
import ICompanyUpdate from '../interfaces/ICompanyUpdate';

export default class UpdateCompanyService {
  private repository: CompaniesRepository;

  constructor() {
    this.repository = getCustomRepository(CompaniesRepository);
  }

  public async execute({
    id,
    razao_social,
    nome_fantasia,
    cnae_fiscal_descricao,
    cnpj,
    descricao_situacao_cadastral,
  }: ICompanyUpdate): Promise<Companies> {
    // encontra a instancia da empresa através do id
    const foundCompany = await this.repository.findById(id);

    if (!foundCompany) throw new ApplicationError('Company not found');

    let foundCompanyByCNPJ;

    // verifica se o cnpj foi preenchido
    if (cnpj) foundCompanyByCNPJ = await this.repository.findByCNPJ(cnpj);

    // verifica se o cnpj não pertence a outra instância diferente da estabelecida
    if (foundCompanyByCNPJ) {
      if (foundCompany.cnpj !== foundCompanyByCNPJ.cnpj)
        throw new ApplicationError('This cnpj belongs to another instance');
    }

    foundCompany.corporate_name = razao_social;
    foundCompany.trade_name = nome_fantasia;
    foundCompany.economic_activity_type = cnae_fiscal_descricao;
    foundCompany.cnpj = cnpj;
    foundCompany.economic_activity_type = descricao_situacao_cadastral;

    if (!(await this.repository.save(foundCompany)))
      throw new ApplicationError(
        'There was an error trygin to update Company instance',
      );

    return foundCompany;
  }
}
