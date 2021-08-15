import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';
import Company from '../typeorm/entities/Company';

interface IRequest {
  id: string;
}

export default class CompanyDetailsService {
  private repository: CompanyRepository;

  constructor() {
    this.repository = getCustomRepository(CompanyRepository);
  }

  public async execute({ id }: IRequest): Promise<Company | undefined> {
    const company = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['address'],
    });

    if (!company) throw new ApplicationError('Company not found');

    return company;
  }
}
