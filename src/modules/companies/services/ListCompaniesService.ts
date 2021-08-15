import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompaniesRepository from '../typeorm/repositories/CompaniesRepositories';
import Companies from '../typeorm/entities/Companies';

export default class ListCompaniesService {
  private repository: CompaniesRepository;

  constructor() {
    this.repository = getCustomRepository(CompaniesRepository);
  }

  public async execute(): Promise<Companies[]> {
    // busca por todas as empresas
    const companies = await this.repository.find();

    if (!companies) throw new ApplicationError('No company was found');

    return companies;
  }
}
