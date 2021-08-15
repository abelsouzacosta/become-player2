import { EntityRepository, Repository } from 'typeorm';
import Company from '../entities/Company';

@EntityRepository(Company)
export default class CompanyRepository extends Repository<Company> {
  // encontra uma empresa através do id fornecido
  public async findById(id: string): Promise<Company | undefined> {
    const company = await this.findOne({
      where: {
        id,
      },
    });

    return company;
  }

  // encontra uma empresa através
  public async findByCNPJ(cnpj: string): Promise<Company | undefined> {
    const company = await this.findOne({
      where: {
        cnpj,
      },
    });

    return company;
  }
}
