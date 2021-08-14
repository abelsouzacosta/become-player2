import { EntityRepository, Repository } from 'typeorm';
import Companies from '../entities/Companies';

@EntityRepository(Companies)
export default class CompaniesRepository extends Repository<Companies> {
  // encontra uma empresa pelo cnpj passado
  public async findByCNPJ(cnpj_number: string): Promise<Companies | undefined> {
    const company = this.findOne({
      where: {
        cnpj: cnpj_number,
      },
    });

    return company;
  }

  public async findById(id: string): Promise<Companies | undefined> {
    const company = this.findOne({
      where: {
        id,
      },
    });

    return company;
  }
}
