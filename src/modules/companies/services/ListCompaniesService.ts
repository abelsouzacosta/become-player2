import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';
import Company from '../typeorm/entities/Company';

export default class ListCompaniesService {
  private repository: CompanyRepository;

  constructor() {
    this.repository = getCustomRepository(CompanyRepository);
  }

  public async execute(): Promise<Company[]> {
    // busca por todas as empresas no banco de dados da aplicação
    const companies = await this.repository.find();

    if (!companies) throw new ApplicationError('No company found');

    return companies;
  }
}
