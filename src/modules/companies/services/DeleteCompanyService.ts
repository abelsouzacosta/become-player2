import { ApplicationError } from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';

interface IDeleteCompany {
  id: string;
}

export default class DeleteCompanyService {
  private repository: CompanyRepository;

  constructor() {
    this.repository = getCustomRepository(CompanyRepository);
  }

  public async execute({ id }: IDeleteCompany): Promise<boolean> {
    // busca pela empresa
    const company = await this.repository.findById(id);

    if (!company) throw new ApplicationError('Company not found');

    const deleted = await this.repository.delete(company);

    if (!deleted)
      throw new ApplicationError(
        'There was an error trying to delete company instance',
      );

    return !!deleted;
  }
}
