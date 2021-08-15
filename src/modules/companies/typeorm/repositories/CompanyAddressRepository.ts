import { EntityRepository, Repository } from 'typeorm';
import CompanyAddress from '../entities/CompanyAddress';

@EntityRepository(CompanyAddress)
export default class CompanyAddressRepository extends Repository<CompanyAddress> {
  public async findById(id: string): Promise<CompanyAddress | undefined> {
    const address = await this.findOne({
      where: {
        id,
      },
    });

    return address;
  }
}
