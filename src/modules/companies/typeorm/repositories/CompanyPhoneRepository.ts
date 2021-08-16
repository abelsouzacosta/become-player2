import { EntityRepository, Repository } from 'typeorm';
import CompanyPhone from '../entities/CompanyPhone';

@EntityRepository(CompanyPhone)
export default class CompanyPhoneRepository extends Repository<CompanyPhone> {
  // encontra os telefones pelo id passado
  public async findById(id: string): Promise<CompanyPhone | undefined> {
    const phones = await this.findOne({
      where: {
        id,
      },
    });

    return phones;
  }
}
